const express = require('express');
const { Op } = require('sequelize');
const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');
const auth = require('../middleware/auth');
const { sequelize } = require('../database');
const router = express.Router();

// Get all available slots (Public route)
router.get('/available-slots-all', async (req, res) => {
  try {
    const today = new Date();
    const todayLocal = new Date(today.getTime() - (today.getTimezoneOffset() * 60000));
    const todayString = todayLocal.toISOString().split('T')[0];

    const availableSlots = await Schedule.findAll({
      where: {
        date: { [Op.gte]: todayString },
        isAvailable: true,
        currentBookings: { [Op.lt]: sequelize.col('Schedule.max_bookings') }
      },
      order: [['date', 'ASC'], ['startTime', 'ASC']]
    });

    res.json({ success: true, data: availableSlots });
  } catch (error) {
    console.error('Get all available slots error:', error);
    res.status(500).json({ success: false, message: 'Error fetching available slots' });
  }
});

// Create booking endpoint
router.post('/create', async (req, res) => {
  try {
    const {
      name, email, phone, propertyType, propertyDetails,
      postcode, propertyAddress, preferredDate, message, slotId,
      paymentMethod, paymentRef, paymentStatus, amount
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !propertyType || !postcode || !propertyAddress || !preferredDate || !slotId) {
      return res.status(400).json({ success: false, message: 'All required fields must be provided' });
    }

    // Check if slot is still available
    const slot = await Schedule.findByPk(slotId);
    if (!slot || !slot.isAvailable || slot.currentBookings >= slot.maxBookings) {
      return res.status(400).json({ success: false, message: 'Selected time slot is no longer available' });
    }

    // Create booking
    const booking = await Booking.create({
      name, email, phone, propertyType, propertyDetails,
      postcode, propertyAddress,
      preferredDate: new Date(preferredDate),
      message,
      paymentMethod: paymentMethod || 'cash',
      paymentRef:    paymentRef    || null,
      paymentStatus: paymentStatus || 'pending',
      amount:        amount        || 0
    });

    // Update slot bookings count
    await slot.update({ currentBookings: slot.currentBookings + 1 });

    // Send confirmation emails (non-blocking)
    try {
      const emailRes = await fetch('http://localhost:5000/api/email/send-booking-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, phone, propertyType, propertyDetails,
          postcode, propertyAddress, preferredDate, message,
          paymentMethod: paymentMethod || 'cash',
          paymentRef:    paymentRef    || '',
          paymentStatus: paymentStatus || 'pending',
          amount:        amount        || 0
        })
      });
      const emailData = await emailRes.json();
      console.log('✅ Email result:', emailData);
    } catch (emailError) {
      console.error('❌ Email failed (booking still saved):', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ success: false, message: 'Error creating booking' });
  }
});

// Get all bookings (Admin only)
router.get('/admin/bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bookings' });
  }
});

// Update booking status (Admin only)
router.put('/admin/bookings/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    await booking.update({ status });
    res.json({ success: true, message: 'Booking updated successfully', data: booking });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ success: false, message: 'Error updating booking' });
  }
});

// Get schedules (Admin only)
router.get('/admin/schedules', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let whereCondition = {};
    if (startDate && endDate) {
      whereCondition.date = { [Op.between]: [startDate, endDate] };
    }
    const schedules = await Schedule.findAll({
      where: whereCondition,
      order: [['date', 'ASC'], ['startTime', 'ASC']]
    });
    res.json({ success: true, data: schedules });
  } catch (error) {
    console.error('Get schedules error:', error);
    res.status(500).json({ success: false, message: 'Error fetching schedules' });
  }
});

// Create schedule (Admin only)
router.post('/admin/schedules', auth, async (req, res) => {
  try {
    const { date, startTime, endTime, isAvailable, maxBookings } = req.body;

    const existingSchedule = await Schedule.findOne({ where: { date, startTime } });
    if (existingSchedule) {
      return res.status(400).json({ success: false, message: 'A schedule already exists for this date and time' });
    }

    const scheduleDate = new Date(date);
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (scheduleDate < today) {
      return res.status(400).json({ success: false, message: 'Cannot create schedule for past dates' });
    }

    const schedule = await Schedule.create({
      date, startTime, endTime,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      maxBookings: maxBookings || 1
    });

    res.status(201).json({ success: true, message: 'Schedule created successfully', data: schedule });
  } catch (error) {
    console.error('Create schedule error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ success: false, message: 'A schedule already exists for this date and time' });
    }
    res.status(500).json({ success: false, message: 'Error creating schedule' });
  }
});

// Cleanup past schedules
const cleanupPastSchedules = async () => {
  try {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayString = today.toISOString().split('T')[0];
    const deletedCount = await Schedule.destroy({ where: { date: { [Op.lt]: todayString } } });
    if (deletedCount > 0) console.log(`🗑️ Cleaned up ${deletedCount} past schedules`);
  } catch (error) {
    console.error('Error cleaning up past schedules:', error);
  }
};
cleanupPastSchedules();
setInterval(cleanupPastSchedules, 24 * 60 * 60 * 1000);

// Update schedule (Admin only)
router.put('/admin/schedules/:id', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    await schedule.update(req.body);
    res.json({ success: true, message: 'Schedule updated successfully', data: schedule });
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ success: false, message: 'Error updating schedule' });
  }
});

// Delete schedule (Admin only)
router.delete('/admin/schedules/:id', auth, async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
    if (!schedule) return res.status(404).json({ success: false, message: 'Schedule not found' });
    await schedule.destroy();
    res.json({ success: true, message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ success: false, message: 'Error deleting schedule' });
  }
});

module.exports = router;
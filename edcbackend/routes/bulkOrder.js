const express = require('express');
const router = express.Router();
const BulkOrder = require('../models/BulkOrder');
const auth = require('../middleware/auth');

// POST /api/bulk-order/create — Submit bulk EPC quote request
router.post('/create', async (req, res) => {
  try {
    const { name, email, phone, propertyType, numberOfProperties, postcodes, additionalInfo } = req.body;
    if (!name || !email || !phone || !propertyType || !numberOfProperties) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields' });
    }
    const order = await BulkOrder.create({
      name, email, phone, propertyType, numberOfProperties, postcodes, additionalInfo
    });
    res.json({ success: true, message: 'Quote request submitted successfully', data: order });
  } catch (error) {
    console.error('Bulk order create error:', error);
    res.status(500).json({ success: false, message: 'Error submitting quote request' });
  }
});

// GET /api/bulk-order/admin/all — Get all bulk orders (Admin only)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const orders = await BulkOrder.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Get bulk orders error:', error);
    res.status(500).json({ success: false, message: 'Error fetching bulk orders' });
  }
});

// PUT /api/bulk-order/admin/:id/status — Update status (Admin only)
router.put('/admin/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await BulkOrder.findByPk(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    await order.update({ status });
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Update bulk order error:', error);
    res.status(500).json({ success: false, message: 'Error updating order' });
  }
});

module.exports = router;
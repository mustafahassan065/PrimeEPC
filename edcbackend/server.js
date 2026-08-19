const express = require('express');
const { sequelize, testConnection } = require('./database');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    "https://primeepcdesign.co.uk",
    "https://www.primeepcdesign.co.uk"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

// Security Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100)
});
app.use('/api/', limiter);

// Database Connection
async function initializeDatabase() {
  try {
    const connected = await testConnection();
    if (connected) {
      const Blog = require('./models/Blog');
      const Admin = require('./models/Admin');
      const Booking = require('./models/Booking');
      const Schedule = require('./models/Schedule');
      const Contact = require('./models/Contact');

      await sequelize.sync({ alter: true });
      console.log('✅ All database tables synchronized with PostgreSQL');

      await createAdminUser();

      if (process.env.NODE_ENV === 'development') {
        await createSampleSchedules();
      }
    }
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

async function createAdminUser() {
  try {
    const Admin = require('./models/Admin');
    const adminCount = await Admin.count();
    if (adminCount === 0 && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: process.env.ADMIN_NAME || 'Super Admin'
      });
      console.log('✅ Default admin user created');
    } else if (adminCount > 0) {
      console.log(`✅ Found ${adminCount} admin user(s) in database`);
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  }
}

async function createSampleSchedules() {
  try {
    const Schedule = require('./models/Schedule');
    const existingSchedules = await Schedule.count();
    if (existingSchedules === 0) {
      const schedules = [];
      for (let i = 1; i <= 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        [{ start: '09:00', end: '10:00' }, { start: '11:00', end: '12:00' }, { start: '14:00', end: '15:00' }].forEach(slot => {
          schedules.push({ date: dateString, startTime: slot.start, endTime: slot.end, isAvailable: true, maxBookings: 2, currentBookings: 0 });
        });
      }
      await Schedule.bulkCreate(schedules, { ignoreDuplicates: true });
      console.log('✅ Sample schedules created for next 7 days');
    }
  } catch (error) {
    console.log('ℹ️ Sample schedules already exist:', error.message);
  }
}

app.get('/api/admin/check', (req, res) => {
  res.json({ success: true, message: 'Admin API is working!', database: 'PostgreSQL', timestamp: new Date().toISOString() });
});

// ── Routes ────────────────────────────────────────────────────────────────
app.use('/api/blogs',   require('./routes/blogs'));
app.use('/api/admin',   require('./routes/admin'));
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/payment', require('./routes/payment'));   // ✅ Stripe + PayPal backend
app.use('/api/email',   require('./routes/email'));

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const dbStatus = await testConnection();
    res.json({
      status: 'OK',
      message: 'Prime EPC Backend is running',
      database: { type: 'PostgreSQL', status: dbStatus ? 'Connected' : 'Disconnected', host: process.env.DB_HOST || 'localhost' },
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Health check failed', error: error.message });
  }
});

app.get('/api/test-blogs', async (req, res) => {
  try {
    const Blog = require('./models/Blog');
    const blogs = await Blog.findAll({ limit: 5, order: [['createdAt', 'DESC']] });
    res.json({ success: true, count: blogs.length, data: blogs.map(b => ({ id: b.id, title: b.title, slug: b.slug, status: b.status, createdAt: b.createdAt })) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Test failed: ' + error.message });
  }
});

app.get('/api/test-booking', async (req, res) => {
  try {
    const Booking = require('./models/Booking');
    const Schedule = require('./models/Schedule');
    const bookings = await Booking.count();
    const schedules = await Schedule.count();
    const availableSchedules = await Schedule.count({ where: { isAvailable: true } });
    res.json({ success: true, message: 'Booking system is working with PostgreSQL', stats: { totalBookings: bookings, totalSchedules: schedules, availableSchedules } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Booking test failed: ' + error.message });
  }
});

app.get('/api/test-db', async (req, res) => {
  try {
    const connected = await testConnection();
    if (connected) {
      res.json({ success: true, message: 'PostgreSQL Database connection successful', database: process.env.DB_NAME || 'companydb', host: process.env.DB_HOST || 'localhost', port: process.env.DB_PORT || 5432 });
    } else {
      res.status(500).json({ success: false, message: 'PostgreSQL Database connection failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Database test failed: ' + error.message });
  }
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found', path: req.originalUrl });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  if (err.name === 'SequelizeValidationError') return res.status(400).json({ success: false, message: 'Validation error', errors: err.errors.map(e => e.message) });
  if (err.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ success: false, message: 'Duplicate entry', errors: err.errors.map(e => e.message) });
  if (err.name === 'JsonWebTokenError') return res.status(401).json({ success: false, message: 'Invalid token' });
  if (err.name === 'TokenExpiredError') return res.status(401).json({ success: false, message: 'Token expired' });
  res.status(err.status || 500).json({ success: false, message: err.message || 'Something went wrong!', ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
});

const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`
🚀 Server Information:
──────────────────────
✅ Server running on port ${PORT}
📊 Environment: ${process.env.NODE_ENV || 'development'}
💾 Database: PostgreSQL (${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME})

🔗 Health check: http://localhost:${PORT}/api/health
🔗 Admin check:  http://localhost:${PORT}/api/admin/check
🔗 Database test: http://localhost:${PORT}/api/test-db
📝 Blogs API:    http://localhost:${PORT}/api/blogs
📅 Booking API:  http://localhost:${PORT}/api/booking/available-slots
💳 Payment API:  http://localhost:${PORT}/api/payment/stripe/create-intent
📧 Email API:    http://localhost:${PORT}/api/email
──────────────────────
    `);
  });
});
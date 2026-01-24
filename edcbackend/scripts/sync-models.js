const { sequelize } = require('../database');
require('dotenv').config();

async function syncModels() {
  console.log('🔄 Syncing Sequelize models with PostgreSQL...\n');
  
  try {
    // Import all models
    require('../models/Admin');
    require('../models/Blog');
    require('../models/Booking');
    require('../models/Schedule');
    require('../models/Contact');
    
    // Sync with database
    await sequelize.sync({ alter: true });
    
    console.log('✅ All models synchronized successfully!');
    console.log('\n📊 Database Schema Summary:');
    console.log('──────────────────────────');
    console.log('1. admins - Admin users table');
    console.log('2. blogs - Blog posts table');
    console.log('3. bookings - Booking requests table');
    console.log('4. schedules - Available time slots table');
    console.log('5. contacts - Contact form submissions');
    
  } catch (error) {
    console.error('❌ Error syncing models:', error);
    process.exit(1);
  }
}

syncModels();
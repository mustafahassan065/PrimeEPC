const Admin = require('../models/Admin');
require('dotenv').config();

async function setupAdmin() {
  try {
    console.log('🔧 Setting up admin user...');
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email: process.env.ADMIN_EMAIL } });
    if (existingAdmin) {
      console.log('ℹ️ Admin already exists');
      process.exit(0);
    }
    
    // Create admin
    const admin = await Admin.create({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      name: 'Prime EPC Admin'
    });
    
    console.log('✅ Admin created successfully');
    console.log('📧 Email:', process.env.ADMIN_EMAIL);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD);
    console.log('💡 You can change these in the .env file');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

setupAdmin();
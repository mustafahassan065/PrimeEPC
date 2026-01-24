const { Pool } = require("pg");
require('dotenv').config(); // Add this at top

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "companyuser",
  password: process.env.DB_PASSWORD || "strongpassword",
  database: process.env.DB_NAME || "companydb",
  port: process.env.DB_PORT || 5432,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL Database connected successfully');
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to PostgreSQL:', error);
    return false;
  }
}

module.exports = { pool, testConnection };
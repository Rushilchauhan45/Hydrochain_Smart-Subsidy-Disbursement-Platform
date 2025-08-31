const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const db = require('./db');

async function checkTables() {
  try {
    console.log('Checking existing tables...');
    
    const result = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Existing tables:', result.rows);
    
    // Check users table structure
    const usersColumns = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND table_schema = 'public'
    `);
    
    console.log('Users table columns:', usersColumns.rows);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

checkTables();

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const db = require('./db');

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    console.log('Database config:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER
    });
    
    // Check if users table exists and has the right structure
    const usersCheck = await db.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND table_schema = 'public'
    `);
    
    if (usersCheck.rows.length > 0) {
      console.log('✅ Users table already exists with existing schema');
    }

    // Create verifications table that works with existing users table
    await db.query(`
      CREATE TABLE IF NOT EXISTS verifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(userid) ON DELETE CASCADE
      )
    `);
    console.log('✅ Verifications table created/verified');

    // Create indexes
    await db.query('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_verifications_user_id ON verifications(user_id)');
    await db.query('CREATE INDEX IF NOT EXISTS idx_verifications_otp ON verifications(otp)');
    console.log('✅ Database indexes created/verified');

    console.log('🎉 Database initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase();

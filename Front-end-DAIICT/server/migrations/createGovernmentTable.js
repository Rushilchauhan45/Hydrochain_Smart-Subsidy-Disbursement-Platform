const db = require('../config/db');

async function createGovernmentTable() {
  try {
    console.log('Creating government_details table...');
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS government_details (
        gov_id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL REFERENCES users(userid) ON DELETE CASCADE,
        department VARCHAR(150) NOT NULL,
        designation VARCHAR(100) NOT NULL,
        bank_account VARCHAR(30) NOT NULL,
        wallet_address VARCHAR(100),
        ifsc_code VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_government_details_user_id 
      ON government_details(user_id);
    `);
    
    console.log('✅ Government details table created successfully!');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  } finally {
    process.exit(0);
  }
}

createGovernmentTable();

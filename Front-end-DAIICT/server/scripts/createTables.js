const db = require('../config/db');

async function createProfileTables() {
  try {
    console.log('🔧 Creating profile tables...');

    // Create producer_details table
    await db.query(`
      CREATE TABLE IF NOT EXISTS producer_details (
        producer_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
        organization_name VARCHAR(150) NOT NULL,
        organization_id VARCHAR(50) NOT NULL,
        wallet_address VARCHAR(100) NOT NULL,
        bank_account VARCHAR(30) NOT NULL,
        ifsc_code VARCHAR(20) NOT NULL,
        kyc_status VARCHAR(20) DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'approved', 'rejected')),
        kyc_document_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `);
    console.log('✅ Producer details table created successfully!');

    // Create auditor_details table
    await db.query(`
      CREATE TABLE IF NOT EXISTS auditor_details (
        auditor_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
        organization_name VARCHAR(150) NOT NULL,
        license_no VARCHAR(50) NOT NULL,
        designation VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `);
    console.log('✅ Auditor details table created successfully!');

    // Create bank_details table
    await db.query(`
      CREATE TABLE IF NOT EXISTS bank_details (
        bank_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
        bank_name VARCHAR(150) NOT NULL,
        branch_name VARCHAR(100) NOT NULL,
        ifsc_code VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `);
    console.log('✅ Bank details table created successfully!');

    console.log('🎉 All profile tables created successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating profile tables:', err);
    process.exit(1);
  }
}

createProfileTables();

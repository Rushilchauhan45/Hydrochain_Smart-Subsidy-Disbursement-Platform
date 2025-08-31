const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  }
});

async function createAllProfileTables() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Create producer_details table
    const createProducerTable = `
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
    `;

    // Create auditor_details table
    const createAuditorTable = `
      CREATE TABLE IF NOT EXISTS auditor_details (
        auditor_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
        organization_name VARCHAR(150) NOT NULL,
        license_no VARCHAR(50) NOT NULL,
        designation VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `;

    // Create bank_details table
    const createBankTable = `
      CREATE TABLE IF NOT EXISTS bank_details (
        bank_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(userid) ON DELETE CASCADE,
        bank_name VARCHAR(150) NOT NULL,
        branch_name VARCHAR(100) NOT NULL,
        ifsc_code VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id)
      );
    `;

    // Execute table creation queries
    await client.query(createProducerTable);
    console.log('✅ Producer details table created successfully!');

    await client.query(createAuditorTable);
    console.log('✅ Auditor details table created successfully!');

    await client.query(createBankTable);
    console.log('✅ Bank details table created successfully!');

    await client.query('COMMIT');
    console.log('🎉 All profile tables created successfully!');

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating profile tables:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

createAllProfileTables();

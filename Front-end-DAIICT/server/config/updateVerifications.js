const db = require('./db');

async function updateVerificationsTable() {
  try {
    console.log('Updating verifications table...');
    
    // Add pending_data column to verifications table
    await db.query(`
      ALTER TABLE verifications 
      ADD COLUMN IF NOT EXISTS pending_data TEXT
    `);
    
    // Allow user_id to be nullable since we're storing pending data
    await db.query(`
      ALTER TABLE verifications 
      ALTER COLUMN user_id DROP NOT NULL
    `);
    
    console.log('✅ Verifications table updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating verifications table:', error);
    process.exit(1);
  }
}

updateVerificationsTable();

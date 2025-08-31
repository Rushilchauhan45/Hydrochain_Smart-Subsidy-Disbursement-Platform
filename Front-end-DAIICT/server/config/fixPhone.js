const db = require('./db');

async function fixPhoneColumn() {
  try {
    console.log('Checking phone column constraints...');
    
    const result = await db.query(`
      SELECT column_name, data_type, character_maximum_length 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'phone';
    `);
    
    console.log('Current phone column:', result.rows);
    
    console.log('Updating phone column to allow longer numbers...');
    await db.query('ALTER TABLE users ALTER COLUMN phone TYPE VARCHAR(20);');
    
    console.log('Phone column updated successfully!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    process.exit();
  }
}

fixPhoneColumn();

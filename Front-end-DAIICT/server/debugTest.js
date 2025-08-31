const axios = require('axios');

async function testRegistration() {
  try {
    console.log('Testing registration with simple data...');
    
    const testUser = {
      firstName: 'John',
      lastName: 'Doe', 
      email: 'john@test.com',
      password: '123',
      countryCode: '+91',
      contact: '1234567890',
      role: 'user'
    };
    
    console.log('Sending registration request...');
    const response = await axios.post('http://localhost:5000/api/auth/register', testUser);
    
    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.log('❌ Registration failed:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else {
      console.log('Network error:', error.message);
    }
  }
}

testRegistration();

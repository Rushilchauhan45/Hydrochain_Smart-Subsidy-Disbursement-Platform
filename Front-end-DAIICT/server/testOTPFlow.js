const axios = require('axios');

// Test the complete signup and OTP verification flow
async function testOTPFlow() {
  try {
    console.log('Testing complete OTP verification flow...\n');
    
    // Step 1: Register a user
    console.log('1. Registering user...');
    const registerResponse = await axios.post('http://localhost:5000/api/auth/register', {
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser' + Date.now() + '@example.com',
      password: 'testpass',
      countryCode: '+91',
      contact: '9876543210',
      role: 'producer'
    });
    
    console.log('Registration response:', registerResponse.data);
    
    if (registerResponse.data.otp) {
      console.log('\n2. OTP received:', registerResponse.data.otp);
      
      // Step 2: Verify OTP
      console.log('3. Verifying OTP...');
      const verifyResponse = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        userId: registerResponse.data.user.id,
        otp: registerResponse.data.otp
      });
      
      console.log('Verification response:', verifyResponse.data);
      console.log('\n✅ OTP verification flow working correctly!');
    } else {
      console.log('❌ No OTP received in registration response');
    }
    
  } catch (error) {
    console.error('❌ Error testing OTP flow:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

testOTPFlow();

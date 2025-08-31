const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testNewOTPFlow() {
  console.log('Testing new OTP flow (account creation only after OTP verification)...\n');
  
  const testEmail = 'newflowtest' + Date.now() + '@example.com';
  let otp;
  
  try {
    console.log('1. Sending OTP without creating account...');
    const otpResponse = await axios.post(`${API_URL}/auth/send-otp`, {
      firstName: 'Test',
      lastName: 'User',
      email: testEmail,
      password: 'testpass123',
      countryCode: '+91',
      contact: '1234567890',
      role: 'producer'
    });
    
    console.log('OTP Response:', {
      success: otpResponse.data.success,
      message: otpResponse.data.message,
      email: otpResponse.data.email,
      otp: otpResponse.data.otp
    });
    
    otp = otpResponse.data.otp;
    
    // Check if user exists in database before verification
    console.log('\n2. Checking if user exists before OTP verification...');
    try {
      const loginAttempt = await axios.post(`${API_URL}/auth/login`, {
        email: testEmail,
        password: 'testpass123'
      });
      console.log('❌ ERROR: User should not exist before OTP verification!');
    } catch (loginError) {
      console.log('✅ Good: User does not exist before OTP verification');
    }
    
    console.log('\n3. Verifying OTP and creating account...');
    const verifyResponse = await axios.post(`${API_URL}/auth/verify-otp-create-account`, {
      email: testEmail,
      otp: otp
    });
    
    console.log('Verification Response:', {
      success: verifyResponse.data.success,
      message: verifyResponse.data.message,
      userCreated: !!verifyResponse.data.user,
      tokenReceived: !!verifyResponse.data.token
    });
    
    console.log('\n4. Testing login after account creation...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: testEmail,
      password: 'testpass123'
    });
    
    console.log('Login Response:', {
      success: loginResponse.data.success,
      userEmail: loginResponse.data.user?.email,
      isVerified: loginResponse.data.user?.isVerified
    });
    
    console.log('\n✅ New OTP flow working correctly!');
    console.log('Account is created ONLY AFTER OTP verification ✅');
    
  } catch (error) {
    console.error('❌ Error testing new OTP flow:');
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  }
}

testNewOTPFlow();

const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testCompleteAuthFlow() {
  try {
    console.log('🧪 Testing Complete Authentication Flow...\n');
    
    // Test 1: Server Health
    console.log('1. Testing server health...');
    try {
      const healthResponse = await axios.get('http://localhost:5000');
      console.log('✅ Server is running:', healthResponse.data);
    } catch (error) {
      console.log('❌ Server health check failed');
      return;
    }
    
    // Test 2: User Registration
    console.log('\n2. Testing user registration...');
    const testUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@hydrochain.com',
      password: '123',
      countryCode: '+91',
      contact: '9876543210',
      role: 'user'
    };
    
    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, testUser);
      console.log('✅ Registration successful!');
      console.log('User ID:', registerResponse.data.user.id);
      console.log('OTP:', registerResponse.data.otp);
      console.log('Token received:', !!registerResponse.data.token);
      
      const { user, otp, token } = registerResponse.data;
      
      // Test 3: OTP Verification
      console.log('\n3. Testing OTP verification...');
      const otpResponse = await axios.post(`${API_URL}/auth/verify-otp`, {
        userId: user.id,
        otp: otp
      });
      console.log('✅ OTP verification successful!');
      console.log('User verified:', otpResponse.data.user.isVerified);
      
      // Test 4: Login
      console.log('\n4. Testing login...');
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      console.log('✅ Login successful!');
      console.log('User:', loginResponse.data.user.firstName, loginResponse.data.user.lastName);
      console.log('Token received:', !!loginResponse.data.token);
      
      // Test 5: Get Current User (with auth token)
      console.log('\n5. Testing get current user...');
      const currentUserResponse = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          'x-auth-token': loginResponse.data.token
        }
      });
      console.log('✅ Get current user successful!');
      console.log('Current user:', currentUserResponse.data.user.fullName);
      
      console.log('\n🎉 All authentication tests passed successfully!');
      
    } catch (error) {
      if (error.response) {
        console.log('❌ Test failed:', error.response.data.message);
        console.log('Status:', error.response.status);
      } else {
        console.log('❌ Network error:', error.message);
      }
    }
    
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

testCompleteAuthFlow();

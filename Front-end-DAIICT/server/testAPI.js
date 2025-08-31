// Test script to verify API endpoints
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing API endpoints...\n');
    
    // Test 1: Check if server is running
    console.log('1. Testing server health...');
    try {
      const healthResponse = await axios.get('http://localhost:5000');
      console.log('✅ Server health:', healthResponse.data);
    } catch (error) {
      console.log('❌ Server health check failed:', error.code || error.message);
      return;
    }
    
    // Test 2: Register a new user
    console.log('\n2. Testing user registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@hydrochain.com',
      password: 'Test123!',
      countryCode: '+91',
      contact: '9876543210',
      role: 'user'
    };
    
    try {
      const registerResponse = await axios.post(`${API_URL}/auth/register`, registerData);
      console.log('✅ Registration successful:', {
        token: registerResponse.data.token ? 'Token received' : 'No token',
        user: registerResponse.data.user,
        otp: registerResponse.data.otp
      });
      
      // Test 3: Login with the same credentials
      console.log('\n3. Testing user login...');
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: registerData.email,
        password: registerData.password
      });
      console.log('✅ Login successful:', {
        token: loginResponse.data.token ? 'Token received' : 'No token',
        user: loginResponse.data.user
      });
      
    } catch (registerError) {
      if (registerError.response?.status === 400 && registerError.response?.data?.message?.includes('already exists')) {
        console.log('ℹ️  User already exists, testing login...');
        
        // Test login if user already exists
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
          email: registerData.email,
          password: registerData.password
        });
        console.log('✅ Login successful:', {
          token: loginResponse.data.token ? 'Token received' : 'No token',
          user: loginResponse.data.user
        });
      } else {
        throw registerError;
      }
    }
    
    console.log('\n🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

testAPI();

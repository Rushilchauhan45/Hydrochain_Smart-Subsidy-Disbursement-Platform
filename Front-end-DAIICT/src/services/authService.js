import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper to get auth token
const getToken = () => localStorage.getItem('token');

// Setup axios interceptors for auth headers
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const authService = {
  // Send OTP without creating account
  async sendOTP(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/send-otp`, userData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send OTP';
      throw { message: errorMessage };
    }
  },

  // Verify OTP and create account
  async verifyOTPAndCreateAccount(email, otp) {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp-create-account`, { email, otp });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      throw { message: errorMessage };
    }
  },

  // Register a new user (keeping for backward compatibility)
  async register(userData) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      throw { message: errorMessage };
    }
  },

  // Verify OTP
  async verifyOTP(userId, otp) {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-otp`, { userId, otp });
      if (response.data.success && response.data.user) {
        // Update user in localStorage with verified status
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'OTP verification failed';
      throw { message: errorMessage };
    }
  },

  // Login user
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      if (response.data.success && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      throw { message: errorMessage };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      if (response.data.success && response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      }
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to get user data';
      throw { message: errorMessage };
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },

  // Get current user from local storage
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;

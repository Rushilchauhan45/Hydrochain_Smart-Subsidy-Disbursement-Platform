const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Send OTP without creating account
// POST /api/auth/send-otp
router.post('/send-otp', authController.sendOTP);

// Verify OTP and create account
// POST /api/auth/verify-otp-create-account
router.post('/verify-otp-create-account', authController.verifyOTPAndCreateAccount);

// Register a new user (keeping for backward compatibility)
// POST /api/auth/register
router.post('/register', authController.register);

// Verify OTP
// POST /api/auth/verify-otp
router.post('/verify-otp', authController.verifyOTP);

// Login user
// POST /api/auth/login
router.post('/login', authController.login);

// Get current user (protected route)
// GET /api/auth/me
router.get('/me', auth, authController.getCurrentUser);

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const emailService = require('../services/emailService');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Generate OTP for verification
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const authController = {
  // Send OTP without creating account
  async sendOTP(req, res) {
    const { firstName, lastName, email, password, countryCode, contact, role } = req.body;

    try {
      // Validate input
      if (!firstName || !lastName || !email || !password || !contact) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user already exists
      const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Generate OTP for verification
      const otp = generateOTP();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

      // Store pending user data and OTP in verifications table
      const pendingData = {
        firstName,
        lastName,
        email,
        password,
        countryCode: countryCode || '+91',
        contact,
        role: role || 'user'
      };

      await db.query(
        'INSERT INTO verifications (user_id, otp, expires_at, pending_data) VALUES ($1, $2, $3, $4)',
        [null, otp, expiresAt, JSON.stringify(pendingData)]
      );

      // Send OTP via email
      console.log(`📧 Sending OTP to ${email}...`);
      const emailResult = await emailService.sendOTPEmail(email, otp, firstName);
      
      if (!emailResult.success) {
        console.error('❌ Failed to send OTP email:', emailResult.error);
        // Clean up the verification record if email fails
        await db.query('DELETE FROM verifications WHERE otp = $1', [otp]);
        
        return res.status(500).json({ 
          message: 'Failed to send OTP email. Please try again.',
          error: emailResult.error 
        });
      }

      console.log('✅ OTP email sent successfully!');
      if (emailResult.previewUrl) {
        console.log('📧 Preview URL:', emailResult.previewUrl);
      }

      res.status(200).json({ 
        success: true,
        message: 'OTP sent successfully to your email',
        email: email,
        previewUrl: emailResult.previewUrl // For testing with Ethereal
        // Note: OTP is not included in response for security - it's sent via email
      });
    } catch (err) {
      console.error('Send OTP error:', err);
      res.status(500).json({ message: 'Server error while sending OTP' });
    }
  },

  // Verify OTP and create account
  async verifyOTPAndCreateAccount(req, res) {
    const { email, otp } = req.body;

    try {
      if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required' });
      }

      // Find verification record by OTP and email in pending_data
      const verification = await db.query(
        'SELECT * FROM verifications WHERE otp = $1 AND expires_at > NOW() AND pending_data::json->>\'email\' = $2',
        [otp, email]
      );

      if (verification.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      const pendingData = JSON.parse(verification.rows[0].pending_data);
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(pendingData.password, salt);

      // Create new user
      const fullName = `${pendingData.firstName} ${pendingData.lastName}`;
      const formattedContact = `${pendingData.countryCode}${pendingData.contact}`;

      const newUser = await db.query(
        'INSERT INTO users (fullname, email, password, phone, role, createdat, isverified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [fullName, pendingData.email, hashedPassword, formattedContact, pendingData.role, new Date(), true]
      );

      // Delete the verification entry
      await db.query('DELETE FROM verifications WHERE otp = $1', [otp]);

      // Send welcome email (async, don't wait for it)
      emailService.sendWelcomeEmail(pendingData.email, pendingData.firstName, pendingData.role)
        .then(result => {
          if (result.success) {
            console.log('Welcome email sent successfully to:', pendingData.email);
          } else {
            console.error('Failed to send welcome email:', result.error);
          }
        })
        .catch(error => {
          console.error('Error sending welcome email:', error);
        });

      // Create JWT token
      const payload = {
        user: {
          id: newUser.rows[0].userid,
          email: newUser.rows[0].email,
          role: newUser.rows[0].role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'hydrochain_secret_key_2024',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) {
            console.error('JWT error:', err);
            return res.status(500).json({ message: 'Error creating token' });
          }
          
          res.status(201).json({ 
            success: true,
            message: 'Account created and verified successfully',
            token,
            user: {
              id: newUser.rows[0].userid,
              firstName: pendingData.firstName,
              lastName: pendingData.lastName,
              fullName: newUser.rows[0].fullname,
              email: newUser.rows[0].email,
              role: newUser.rows[0].role,
              isVerified: true
            }
          });
        }
      );
    } catch (err) {
      console.error('OTP verification and account creation error:', err);
      res.status(500).json({ message: 'Server error during verification' });
    }
  },

  // Register user (keeping original for backward compatibility)
  async register(req, res) {
    const { firstName, lastName, email, password, countryCode, contact, role } = req.body;

    try {
      // Validate input
      if (!firstName || !lastName || !email || !password || !contact) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check if user exists
      const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user with existing schema
      const fullName = `${firstName} ${lastName}`;
      const formattedContact = `${countryCode || '+91'}${contact}`;

      const newUser = await db.query(
        'INSERT INTO users (fullname, email, password, phone, role, createdat, isverified) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [fullName, email, hashedPassword, formattedContact, role || 'user', new Date(), false]
      );

      // Generate OTP for verification
      const otp = generateOTP();
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 10); // OTP valid for 10 minutes

      await db.query(
        'INSERT INTO verifications (user_id, otp, expires_at) VALUES ($1, $2, $3)',
        [newUser.rows[0].userid, otp, expiresAt]
      );

      // Create JWT token
      const payload = {
        user: {
          id: newUser.rows[0].userid,
          email: newUser.rows[0].email,
          role: newUser.rows[0].role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'hydrochain_secret_key_2024',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) {
            console.error('JWT error:', err);
            return res.status(500).json({ message: 'Error creating token' });
          }
          
          res.status(201).json({ 
            success: true,
            message: 'User registered successfully',
            token,
            user: {
              id: newUser.rows[0].userid,
              firstName: firstName,
              lastName: lastName,
              fullName: newUser.rows[0].fullname,
              email: newUser.rows[0].email,
              role: newUser.rows[0].role,
              needsVerification: true
            },
            otp // In production, send this via SMS/email instead of in response
          });
        }
      );
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // Verify OTP
  async verifyOTP(req, res) {
    const { userId, otp } = req.body;

    try {
      if (!userId || !otp) {
        return res.status(400).json({ message: 'User ID and OTP are required' });
      }

      const verification = await db.query(
        'SELECT * FROM verifications WHERE user_id = $1 AND otp = $2 AND expires_at > NOW()',
        [userId, otp]
      );

      if (verification.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }

      // Update user as verified
      await db.query('UPDATE users SET isverified = true WHERE userid = $1', [userId]);
      
      // Delete the verification entry
      await db.query('DELETE FROM verifications WHERE user_id = $1', [userId]);

      // Get user details for response
      const user = await db.query('SELECT * FROM users WHERE userid = $1', [userId]);
      
      const nameParts = user.rows[0].fullname.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      res.json({ 
        success: true,
        message: 'User successfully verified',
        user: {
          id: user.rows[0].userid,
          firstName: firstName,
          lastName: lastName,
          fullName: user.rows[0].fullname,
          email: user.rows[0].email,
          role: user.rows[0].role,
          isVerified: true
        }
      });
    } catch (err) {
      console.error('OTP verification error:', err);
      res.status(500).json({ message: 'Server error during verification' });
    }
  },

  // Login user
  async login(req, res) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      // Check if user exists
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create JWT token
      const payload = {
        user: {
          id: user.rows[0].userid,
          email: user.rows[0].email,
          role: user.rows[0].role
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET || 'hydrochain_secret_key_2024',
        { expiresIn: '24h' },
        (err, token) => {
          if (err) {
            console.error('JWT error:', err);
            return res.status(500).json({ message: 'Error creating token' });
          }
          
          // Parse fullname into firstName and lastName
          const nameParts = user.rows[0].fullname.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';
          
          res.json({ 
            success: true,
            message: 'Login successful',
            token,
            user: {
              id: user.rows[0].userid,
              firstName: firstName,
              lastName: lastName,
              fullName: user.rows[0].fullname,
              email: user.rows[0].email,
              role: user.rows[0].role,
              isVerified: user.rows[0].isverified || false
            }
          });
        }
      );
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  },
  
  // Get current user
  async getCurrentUser(req, res) {
    try {
      const user = await db.query('SELECT userid, fullname, email, role, isverified FROM users WHERE userid = $1', [req.user.id]);
      
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Parse fullname into firstName and lastName
      const nameParts = user.rows[0].fullname.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      res.json({
        success: true,
        user: {
          id: user.rows[0].userid,
          firstName: firstName,
          lastName: lastName,
          fullName: user.rows[0].fullname,
          email: user.rows[0].email,
          role: user.rows[0].role,
          isVerified: user.rows[0].isverified || false
        }
      });
    } catch (err) {
      console.error('Get user error:', err);
      res.status(500).json({ message: 'Server error getting user' });
    }
  }
};

module.exports = authController;

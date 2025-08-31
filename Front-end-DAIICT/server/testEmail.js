const emailService = require('./services/emailService');
require('dotenv').config();

async function testEmailService() {
  console.log('Testing email service...');
  
  const testEmail = 'test@example.com'; // Replace with your test email
  const testOTP = '123456';
  const testName = 'Test User';
  
  try {
    // Test OTP email
    console.log('Sending OTP email...');
    const otpResult = await emailService.sendOTPEmail(testEmail, testOTP, testName);
    
    if (otpResult.success) {
      console.log('✅ OTP email sent successfully!');
      console.log('Message ID:', otpResult.messageId);
    } else {
      console.log('❌ Failed to send OTP email:', otpResult.error);
    }
    
    // Test welcome email
    console.log('\nSending welcome email...');
    const welcomeResult = await emailService.sendWelcomeEmail(testEmail, testName, 'user');
    
    if (welcomeResult.success) {
      console.log('✅ Welcome email sent successfully!');
      console.log('Message ID:', welcomeResult.messageId);
    } else {
      console.log('❌ Failed to send welcome email:', welcomeResult.error);
    }
    
  } catch (error) {
    console.error('❌ Email service test failed:', error);
  }
}

// Run the test
testEmailService();

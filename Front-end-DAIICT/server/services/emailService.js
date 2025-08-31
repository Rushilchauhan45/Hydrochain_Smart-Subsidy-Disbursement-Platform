const nodemailer = require('nodemailer');
require('dotenv').config();

// Create email transporter
const createTransporter = async () => {
  // Check if we have real email credentials
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && 
      process.env.GMAIL_USER !== 'test.hydrochain@gmail.com' && 
      process.env.GMAIL_APP_PASSWORD !== 'test-app-password') {
    
    // Use real Gmail credentials
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
  } else {
    // Use Ethereal Email for testing (creates fake but working email service)
    console.log('Creating test email account...');
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('📧 Test email account created:');
    console.log('User:', testAccount.user);
    console.log('Pass:', testAccount.pass);
    console.log('You can view emails at: https://ethereal.email/');
    
    return transporter;
  }
};

const emailService = {
  async sendOTPEmail(email, otp, firstName) {
    try {
      const transporter = await createTransporter();
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@hydrochain.com',
        to: email,
        subject: 'Hydrochain - Email Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #00ff88; margin: 0; font-size: 28px;">🌊 Hydrochain</h1>
                <p style="color: #666; margin: 5px 0;">Smart Subsidy Disbursement Platform</p>
              </div>
              
              <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Email Verification</h2>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Hi ${firstName || 'there'},
              </p>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Thank you for signing up for Hydrochain! To complete your account creation, please use the verification code below:
              </p>
              
              <div style="background-color: #f0f8ff; border: 2px dashed #00ff88; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                <h3 style="color: #333; margin: 0 0 10px 0;">Your Verification Code</h3>
                <div style="font-size: 32px; font-weight: bold; color: #00ff88; letter-spacing: 4px; font-family: monospace;">
                  ${otp}
                </div>
                <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                  This code expires in 10 minutes
                </p>
              </div>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Enter this code on the verification page to create your account and start using Hydrochain's smart subsidy disbursement platform.
              </p>
              
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px;">
                  <strong>Security Notice:</strong> If you didn't request this verification code, please ignore this email. Your account will not be created without verification.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This email was sent by Hydrochain Smart Subsidy Disbursement Platform
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                  © 2025 Hydrochain. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      
      // If using test account, show preview URL
      if (nodemailer.getTestMessageUrl(info)) {
        console.log('📧 Preview email: ' + nodemailer.getTestMessageUrl(info));
        console.log('🔗 Or visit: https://ethereal.email/messages');
      }
      
      console.log('OTP email sent successfully:', info.messageId);
      return { 
        success: true, 
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
      };
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return { success: false, error: error.message };
    }
  },

  async sendWelcomeEmail(email, firstName, role) {
    try {
      const transporter = await createTransporter();
      
      const mailOptions = {
        from: process.env.FROM_EMAIL || 'noreply@hydrochain.com',
        to: email,
        subject: 'Welcome to Hydrochain - Account Created Successfully!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; border-radius: 10px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #00ff88; margin: 0; font-size: 28px;">🌊 Hydrochain</h1>
                <p style="color: #666; margin: 5px 0;">Smart Subsidy Disbursement Platform</p>
              </div>
              
              <h2 style="color: #333; text-align: center; margin-bottom: 20px;">Welcome to Hydrochain!</h2>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},
              </p>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                Congratulations! Your Hydrochain account has been successfully created and verified. You can now access your ${role} dashboard and start using our smart subsidy disbursement platform.
              </p>
              
              <div style="background-color: #e8f5e8; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: center;">
                <h3 style="color: #2d5a2d; margin: 0 0 10px 0;">🎉 Account Details</h3>
                <p style="color: #2d5a2d; margin: 5px 0;">
                  <strong>Email:</strong> ${email}
                </p>
                <p style="color: #2d5a2d; margin: 5px 0;">
                  <strong>Role:</strong> ${role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
                <p style="color: #2d5a2d; margin: 5px 0;">
                  <strong>Status:</strong> ✅ Verified
                </p>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="http://localhost:8081" style="background-color: #00ff88; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Access Your Dashboard
                </a>
              </div>
              
              <p style="color: #555; font-size: 16px; line-height: 1.6;">
                You can now:
              </p>
              <ul style="color: #555; font-size: 16px; line-height: 1.8;">
                <li>Access your role-specific dashboard</li>
                <li>Track subsidy disbursements</li>
                <li>Monitor project milestones</li>
                <li>Manage smart contracts</li>
              </ul>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This email was sent by Hydrochain Smart Subsidy Disbursement Platform
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                  © 2025 Hydrochain. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      
      // If using test account, show preview URL
      if (nodemailer.getTestMessageUrl(info)) {
        console.log('📧 Preview welcome email: ' + nodemailer.getTestMessageUrl(info));
      }
      
      console.log('Welcome email sent successfully:', info.messageId);
      return { 
        success: true, 
        messageId: info.messageId,
        previewUrl: nodemailer.getTestMessageUrl(info)
      };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = emailService;

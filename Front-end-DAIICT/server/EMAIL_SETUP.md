# Email Configuration Setup Guide

## Overview
The Hydrochain platform now includes email functionality for OTP verification and welcome emails. This guide will help you set up email sending capabilities.

## Email Service Features
- ✅ OTP verification emails with professional design
- ✅ Welcome emails after successful account creation
- ✅ Beautiful HTML email templates with Hydrochain branding
- ✅ Secure email delivery using nodemailer
- ✅ Support for Gmail and custom SMTP providers

## Setup Options

### Option 1: Gmail Configuration (Recommended for Development)

1. **Enable 2-Factor Authentication on your Gmail account**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Factor Authentication

2. **Generate an App Password**
   - Go to https://support.google.com/accounts/answer/185833
   - Select "Mail" as the app
   - Select "Other" as the device
   - Name it "Hydrochain Platform"
   - Copy the generated 16-character password

3. **Update the .env file**
   ```env
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   FROM_EMAIL=noreply@hydrochain.com
   ```

### Option 2: Custom SMTP Configuration (For Production)

1. **Get SMTP credentials from your email provider** (SendGrid, Mailgun, AWS SES, etc.)

2. **Update the .env file**
   ```env
   EMAIL_HOST=smtp.yourdomain.com
   EMAIL_PORT=587
   EMAIL_USER=noreply@yourdomain.com
   EMAIL_PASS=your-smtp-password
   FROM_EMAIL=noreply@yourdomain.com
   ```

## Testing Email Functionality

### Method 1: Use the Test Script
```bash
cd server
node testEmail.js
```

### Method 2: Test via API
1. Start the server: `node server.js`
2. Use the signup flow:
   - POST `/api/auth/send-otp` with user registration data
   - Check your email for the OTP
   - POST `/api/auth/verify-otp-and-create-account` with email and OTP

## Email Templates

### OTP Verification Email
- Professional Hydrochain branding
- Clear verification code display
- Security notices
- 10-minute expiration notice

### Welcome Email
- Congratulations message
- Account details confirmation
- Quick access link to dashboard
- Role-specific welcome message

## Troubleshooting

### Common Issues

1. **"Authentication failed" error**
   - Make sure you're using an App Password, not your regular Gmail password
   - Verify that 2-Factor Authentication is enabled

2. **"Connection refused" error**
   - Check your internet connection
   - Verify SMTP server settings
   - Check if your firewall is blocking the connection

3. **"Invalid login" error**
   - Double-check your email and password in the .env file
   - Make sure there are no extra spaces in the credentials

### Debug Mode
To see detailed email sending logs, check the server console when sending emails.

## Security Best Practices

1. **Never commit .env files to version control**
2. **Use App Passwords instead of regular passwords**
3. **Keep email credentials secure**
4. **Use HTTPS in production**
5. **Consider rate limiting for email sending**

## Production Deployment

For production deployment, consider:
1. Using a dedicated email service (SendGrid, Mailgun, AWS SES)
2. Setting up proper DNS records (SPF, DKIM, DMARC)
3. Implementing email sending rate limits
4. Adding email delivery monitoring
5. Using environment-specific configurations

## Environment Variables Reference

```env
# Required for Gmail
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Required for Custom SMTP
EMAIL_HOST=smtp.yourdomain.com
EMAIL_PORT=587
EMAIL_USER=smtp-username
EMAIL_PASS=smtp-password

# General (Required)
FROM_EMAIL=noreply@yourdomain.com
FRONTEND_URL=http://localhost:8081
```

## Files Modified
- `server/services/emailService.js` - Email service implementation
- `server/controllers/authController.js` - Updated to send emails
- `server/.env` - Email configuration
- `server/package.json` - Added nodemailer dependency

## Next Steps
1. Configure your email credentials in the .env file
2. Test the email functionality using the test script
3. Try the complete signup flow to verify everything works
4. Customize email templates if needed

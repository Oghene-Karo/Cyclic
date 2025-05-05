const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

// In-memory store for reset tokens (use database in production)
const resetTokens = {};

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// Generate reset token
router.post('/request-reset', (req, res) => {
    const { email } = req.body;
    const token = crypto.randomBytes(20).toString('hex');
    
    // Store token with expiration (1 hour)
    resetTokens[email] = {
        token,
        expires: Date.now() + 3600000
    };

    // Send email
    const mailOptions = {
        from: 'CYCLIC <no-reply@cyclic.com>',
        to: email,
        subject: 'Password Reset Request',
        html: `
            <p>You requested a password reset for your CYCLIC account.</p>
            <p>Click this link to reset your password:</p>
            <a href="http://yourdomain.com/reset-password.html?token=${token}&email=${encodeURIComponent(email)}">
                Reset Password
            </a>
            <p>This link expires in 1 hour.</p>
        `
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.json({ message: 'Recovery email sent' });
    });
});

// Verify token and reset password
router.post('/reset-password', (req, res) => {
    const { email, token, newPassword } = req.body;
    const record = resetTokens[email];

    if (!record || record.token !== token || record.expires < Date.now()) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Update password in your database here
    // ...

    // Clear token
    delete resetTokens[email];
    
    res.json({ message: 'Password updated successfully' });
});

module.exports = router;
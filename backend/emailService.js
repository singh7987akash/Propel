const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Send welcome email
exports.sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Propel Crowdfunding Platform',
            html: `
        <h1>Welcome ${name}!</h1>
        <p>Thank you for joining Propel Crowdfunding Platform.</p>
        <p>Start exploring amazing projects or create your own campaign today!</p>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent to:', email);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

// Send donation confirmation email
exports.sendDonationEmail = async (email, projectTitle, amount) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Donation Confirmation - Propel',
            html: `
        <h1>Thank You for Your Donation!</h1>
        <p>Your donation of $${amount} to "${projectTitle}" has been confirmed.</p>
        <p>Your support makes a difference!</p>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Donation confirmation email sent to:', email);
    } catch (error) {
        console.error('Error sending donation email:', error);
    }
};

// Send project creation confirmation email
exports.sendProjectCreatedEmail = async (email, projectTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Project Created Successfully - Propel',
            html: `
        <h1>Your Project is Live!</h1>
        <p>Congratulations! Your project "${projectTitle}" has been successfully created.</p>
        <p>Start sharing it with potential donors!</p>
      `
        };

        await transporter.sendMail(mailOptions);
        console.log('Project creation email sent to:', email);
    } catch (error) {
        console.error('Error sending project creation email:', error);
    }
};

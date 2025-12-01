const nodemailer = require('nodemailer');

exports.sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    // Placeholder for Nodemailer setup
    // In production, use process.env.EMAIL_USER and process.env.EMAIL_PASS

    console.log(`[Email Simulation] From: ${name} (${email}) - Message: ${message}`);

    // Simulate success
    res.json({ message: 'Email sent successfully (simulated)' });
};

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, inquiryType, message } = req.body;
    
    // Save to database (you can create a Contact model)
    // const contact = new Contact({ name, email, phone, inquiryType, message });
    // await contact.save();
    
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: email,
      to: process.env.ADMIN_EMAIL || 'admin@freshfarm.com',
      subject: `New Contact Form: ${inquiryType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
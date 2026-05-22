const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("No EMAIL_USER provided. Skipping email to prevent Render timeout.");
      return { success: true, previewUrl: null };
    }

    // Use real SMTP if provided
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Flipkart Clone" <noreply@flipkartclone.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    return { success: true, previewUrl: null };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

module.exports = sendEmail;

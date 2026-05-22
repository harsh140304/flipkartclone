const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("No EMAIL_USER provided. Skipping email to prevent timeout.");
      return { success: true, previewUrl: null };
    }

    // Use real SMTP if provided, with aggressive timeouts to prevent Render free-tier hangs
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 3000, // 3 seconds timeout
      greetingTimeout: 3000,
      socketTimeout: 3000,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Flipkart Clone" <noreply@flipkartclone.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    console.log("Attempting to send email...");
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    return { success: true, previewUrl: null };
  } catch (error) {
    console.log('Email failed to send (likely due to Render SMTP port block), but continuing order processing.');
    console.error('Error sending email:', error.message);
    return { success: false, error };
  }
};

module.exports = sendEmail;

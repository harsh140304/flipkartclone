const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    let transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Use real SMTP if provided
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Fallback to Ethereal Email for testing purposes
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      console.log("No EMAIL_USER provided. Using Ethereal test account.");
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Flipkart Clone" <noreply@flipkartclone.com>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    let previewUrl = null;
    if (!process.env.EMAIL_USER) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("Preview URL: %s", previewUrl);
    }
    
    return { success: true, previewUrl };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};

module.exports = sendEmail;

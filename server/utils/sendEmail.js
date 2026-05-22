const sendEmail = async (options) => {
  console.log("Simulating email send for:", options.to);
  console.log("Email content:", options.subject);
  // Render free tier blocks outbound SMTP ports (25, 465, 587)
  // We cannot use nodemailer here without hanging the server.
  // Returning immediately.
  return { success: true, previewUrl: null };
};

module.exports = sendEmail;

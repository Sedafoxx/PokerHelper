const fs = require('fs');  // For storing data in a file
const sgMail = require('@sendgrid/mail');

// This will be the main function handler
exports.handler = async (event) => {
  // Set your SendGrid API Key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  // Parse the body of the request (assuming POST request with JSON data)
  const { email, name } = JSON.parse(event.body);

  // Data to be stored in waitlist.txt
  const dataToStore = `Name: ${name}, Email: ${email}\n`;

  // Append to file
  try {
    fs.appendFileSync('waitlist.txt', dataToStore, 'utf8');
    console.log('User data saved.');
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to store user data', error }),
    };
  }

  // Define the email content
  const msg = {
    to: email, // Send to the user's email
    from: 'pokerhelper@proton.me', // Your verified SendGrid email
    subject: 'Welcome to PokerHelper!',
    text: `Hi ${name},\n\nThank you for signing up to PokerHelper! We are rolling out access step by step, and you will be notified when it’s ready for you to try.\n\nBest regards,\nThe PokerHelper Team`,
    html: `<strong>Hi ${name},</strong><br><br>Thank you for signing up to <strong>PokerHelper</strong>! We are rolling out access step by step, and you will be notified when it’s ready for you to try.<br><br>Best regards,<br><strong>The PokerHelper Team</strong>`,
  };

  // Send the email using SendGrid
  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully and user saved!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to send email', error }),
    };
  }
};

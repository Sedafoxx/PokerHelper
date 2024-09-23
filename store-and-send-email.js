// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs



const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

const msg = {
  to: 'buryakdimitri@gmail.com', // Change to your recipient
  from: 'pokerhelper@proton.me', // Change to your verified sender
  subject: 'Thanks for signing up!',
  text: 'Thank you for signing up to PokerHelper! We’re rolling out access step by step, and you will be notified as soon as the app is ready for you to try.',
  html: `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      .cta-button {
        background-color: #28a745;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
      }
      /* Responsive design */
      @media only screen and (max-width: 600px) {
        .content {
          font-size: 16px;
        }
      }
    </style>
  </head>
  <body style="font-family: Arial, sans-serif;">
    <!-- Header with logo -->
    <img src="https://pokerhelper.ddns.net/header.png" alt="PokerHelper" style="width: 100%; height: auto;">
    <!-- Greeting -->
    <p>Hi there,</p>
    <p>Thank you for signing up to <strong>PokerHelper</strong>! We’re thrilled to have you on board.</p>
    <!-- Benefits -->
    <p><strong>With PokerHelper, you can:</strong></p>
    <ul>
      <li>Learn poker strategies from beginner to pro.</li>
      <li>Track chips, money, and player stats effortlessly.</li>
      <li>Table, prizepool and time management tools for tournaments.</li>
    </ul>
    <!-- CTA Button -->
    <p>
      <a href="https://pokerhelper.ddns.net" class="cta-button">Get Started Now</a>
    </p>
    <!-- Friendly Closing -->
    <p>We can’t wait to see you try PokerHelper! You’ll be among the first to experience all the awesome features we’ve been working on.</p>
    <p>Best regards,<br><strong>The PokerHelper Team</strong></p>
    <!-- Footer -->
    <p style="font-size: 12px; color: gray;">If you have any questions, feel free to reply to this email or visit our website.</p>
  </body>
  </html>
  `
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error);
  });

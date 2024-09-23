const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'buryakdimitri@gmail.com', // Your recipient
  from: 'pokerhelper@proton.me', // Your verified sender
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
    <img src="https://pokerhelper.ddns.net/header.png" alt="PokerHelper" style="width: 100%; height: auto;">
    <p>Hi there,</p>
    <p>Thank you for signing up to <strong>PokerHelper</strong>! We’re thrilled to have you on board.</p>
    <p><strong>With PokerHelper, you can:</strong></p>
    <ul>
      <li>Learn poker strategies from beginner to pro.</li>
      <li>Track chips, money, and player stats effortlessly.</li>
      <li>Table, prize pool, and time management tools for tournaments.</li>
    </ul>
    <p>
      <a href="https://pokerhelper.ddns.net" class="cta-button">Get Started Now</a>
    </p>
    <p>Best regards,<br><strong>The PokerHelper Team</strong></p>
  </body>
  </html>
  `
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully');
  })
  .catch((error) => {
    if (error.response) {
      console.error('SendGrid Error Response:', error.response.body);
    } else {
      console.error('Error:', error.message);
    }
  });

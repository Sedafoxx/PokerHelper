const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
    try {
        // Parse the request body to get the name and email
        const { name, email } = JSON.parse(event.body);

        // Validate the name and email
        if (!name || !email) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: 'Name and email are required fields!',
                }),
            };
        }

        // Fetch the SendGrid API key from environment variables
        const apiKey = process.env.SENDGRID_API_KEY;

        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not defined in environment variables');
        }

        // Initialize SendGrid with the API key
        sgMail.setApiKey(apiKey);

        // Define the email message
        const msg = {
            to: email, // Use the email provided in the input
            from: 'pokerhelper@proton.me', // Your verified sender
            subject: `Welcome, ${name}! Thanks for signing up!`, // Personalized subject
            text: `Hi ${name},\nThank you for signing up to PokerHelper! We’re thrilled to have you on board.`,
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
                .share-button {
                  background-color: #b9363e;
                  color: white;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                  display: inline-block;
                }
                @media only screen and (max-width: 600px) {
                  .content {
                    font-size: 16px;
                  }
                }
              </style>
            </head>
            <body style="font-family: Arial, sans-serif;">
              <img src="https://pokerhelper.ddns.net/header.png" alt="PokerHelper" style="width: 100%; height: auto;">
              
              <p>Hi ${name},</p>

              <p>Welcome to <strong>PokerHelper</strong>! We're excited that you've taken the first step toward enhancing your poker game. Whether you're a seasoned player or just getting started, we're here to support you at every level.</p>

              <p><strong>With PokerHelper, you'll be able to:</strong></p>
              <ul>
                <li>Master poker strategies, from beginner fundamentals to advanced techniques.</li>
                <li>Effortlessly track chips, money, and player stats to keep your game sharp.</li>
                <li>Manage tables, prize pools, and time for your tournaments with ease.</li>
              </ul>

              <p>And that’s just the beginning! You’re about to unlock a new way to play and win in poker. To kick things off, we have something special for you.</p>

              <p><strong>Your secret password:</strong></p>

              <p style="font-size: 1.2em; color: #d9534f; font-weight: bold;">IAMALLIN</p>

              <p>Use this password to access the exclusive Beta APK on our website!</p>

              <!-- WhatsApp Share -->
              <p style="margin-top: 20px;">
                <a href="https://wa.me/?text=I just signed up for PokerHelper, check it out at https://pokerhelper.ddns.net!" class="cta-button" style="background-color: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Share on WhatsApp</a>
              </p>

              <!-- Email Share -->
              <p>
                <a href="mailto:?subject=Check%20out%20PokerHelper&body=Try%20out%20PokerHelper%20here:%20https://pokerhelper.ddns.net" class="share-button" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Share via Email</a>
              </p>

              <p>Thank you for joining us on this exciting journey. We can’t wait to see you rise through the ranks of poker pros!</p>

              <p><strong>The PokerHelper Team</strong></p>
            </body>
            </html>
            `
        };

        // Send the email using SendGrid
        await sgMail.send(msg);

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Thank you for signing up! A confirmation email has been sent!',
            }),
        };
    } catch (error) {
        // Log the error
        console.error("Error occurred while sending email", error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send email',
                details: error.response ? error.response.body : error.message,
            }),
        };
    }
};

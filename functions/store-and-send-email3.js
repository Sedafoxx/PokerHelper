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
              <p>Thank you for signing up to <strong>PokerHelper</strong>! We’re thrilled to have you on board.</p>
              <p><strong>With PokerHelper, you can:</strong></p>
              <ul>
                <li>Learn poker strategies from beginner to pro.</li>
                <li>Track chips, money, and player stats effortlessly.</li>
                <li>Table, prize pool, and time management tools for tournaments.</li>
              </ul>

              <p>Your password to unlock the demo will be sent to you soon. Stay tuned for more details!</p>

              <!-- WhatsApp Share -->
              <p>
                <a href="https://wa.me/?text=I just signed up for PokerHelper, check it out at https://pokerhelper.ddns.net!" class="cta-button">Share on WhatsApp</a>
              </p>
              
              <p>
                <a href="mailto:?subject=Check%20out%20PokerHelper&body=Try%20out%20PokerHelper%20here:%20https://pokerhelper.ddns.net" class="share-button">Share via Email</a>
              </p>

              <p>Thank you for your interest! We are excited to have you on board on this beautiful journey!<br><strong>The PokerHelper Team</strong></p>
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

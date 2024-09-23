const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
    try {
        // Fetch the SendGrid API key from environment variables
        const apiKey = process.env.SENDGRID_API_KEY;

        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not defined in environment variables');
        }

        // Initialize SendGrid with the API key
        sgMail.setApiKey(apiKey);

        // Define the email message
        const msg = {
            to: 'buryakdimitri@gmail.com', // Your recipient
            from: 'pokerhelper@proton.me', // Your verified sender
            subject: 'Thanks for signing up!',
            text: 'Thank you for signing up to PokerHelper! We’re thrilled to have you on board.',
            html: '<strong>Thank you for signing up to PokerHelper!</strong> We’re rolling out access step by step, and you will be notified as soon as the app is ready for you to try.',
        };

        // Send the email using SendGrid
        await sgMail.send(msg);

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Email sent successfully!',
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

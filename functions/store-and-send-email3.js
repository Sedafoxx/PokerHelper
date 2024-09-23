// store-and-send-email3.js
exports.handler = async (event, context) => {
    try {
        // Fetch the SendGrid API key from the environment variables
        const apiKey = process.env.SENDGRID_API_KEY;

        if (!apiKey) {
            throw new Error('SENDGRID_API_KEY is not defined in environment variables');
        }

        // Extract the first few characters (e.g., first 6 characters) of the API key
        const firstFewChars = apiKey.substring(0, 6);

        // Return the response with the first few characters of the API key
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `First few characters of your API key: ${firstFewChars}...`,
            }),
        };
    } catch (error) {
        console.error("Error occurred in the function", error);

        // Return an error response if something goes wrong
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to retrieve API key',
            }),
        };
    }
};

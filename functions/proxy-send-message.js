const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  try {
    const { name, email } = JSON.parse(event.body);

    // Compose the message to send to the external server
    const message = `Sign Up: Name - ${name}, Email - ${email}`;

    // Send the message to the external server (bypass CORS by using this proxy)
    const response = await fetch('https://pokerhelper.bposselt.at/send_message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        message: message,
      }),
    });

    const responseText = await response.text();

    // Return success if the external server successfully handles the message
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent successfully',
        serverResponse: responseText,
      }),
    };
  } catch (error) {
    // Return error if anything goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send message via proxy',
        details: error.message,
      }),
    };
  }
};

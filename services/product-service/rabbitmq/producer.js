const connectToRabbitMQ = require("./connection");

const sendMessage = async (queue, message) => {
  try {
    
    const channel = await connectToRabbitMQ();
    
    await channel.assertQueue(queue);

    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queue, messageBuffer);

  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
  }
};

module.exports = { sendMessage };

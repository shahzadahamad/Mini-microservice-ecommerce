const amqplib = require("amqplib");
const config = require("../config/config");

const sendMessage = async (queue, message, next) => {
  try {
    const connection = await amqplib.connect(config.amqplibServeUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    const messageBuffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queue, messageBuffer);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error("Error sending message to RabbitMQ:", error);
    next(error);
  }
};

module.exports = { sendMessage };

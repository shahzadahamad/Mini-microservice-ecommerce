const amqplib = require("amqplib");
const config = require("../config/config");

const consumeOrderMessages = async () => {
  try {
    const connection = await amqplib.connect(config.amqplibServeUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue("ORDER", { durable: true });

    let order;

    channel.consume("PRODUCT", (message) => {
      if (message !== null) {
        order = JSON.parse(message.content.toString());
        channel.ack(message);
      }
    });

    return order;
  } catch (error) {
    console.error("Error consuming product messages from RabbitMQ:", error);
  }
};

module.exports = { consumeOrderMessages };

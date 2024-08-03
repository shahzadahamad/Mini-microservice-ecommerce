const connectToRabbitMQ = require("./connection");

const consumeOrderMessages = async () => {
  try {
    const channel = await connectToRabbitMQ();

    return new Promise((resolve, reject) => {
      channel.consume("PRODUCT", (message) => {
        if (message !== null) {
          order = JSON.parse(message.content.toString());
          channel.ack(message);
          resolve(order);
        }
      });
    });

  } catch (error) {
    console.error("Error consuming product messages from RabbitMQ:", error);
  }
};

module.exports = { consumeOrderMessages };

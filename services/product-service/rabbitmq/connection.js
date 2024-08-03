const amqplib = require("amqplib");

let channel;

const connectToRabbitMQ = async () => {
  try {
    if (channel) return channel;
    const connection = await amqplib.connect(process.env.amqplibServeUrl);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
    return channel;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

module.exports = connectToRabbitMQ;

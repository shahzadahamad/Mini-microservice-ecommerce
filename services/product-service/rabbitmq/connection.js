const amqplib = require("amqplib");

let channel;
const maxRetries = 5; 
const retryDelay = 5000; 

const connectToRabbitMQ = async () => {
  try {
    if (channel) return channel;

    const connect = async (retries) => {
      try {
        const connection = await amqplib.connect(process.env.amqplibServeUrl);
        channel = await connection.createChannel();
        await channel.assertQueue("PRODUCT");
        return channel;
      } catch (error) {
        console.error(`Connection attempt failed: ${error.message}`);
        if (retries <= 0) {
          throw new Error('Max retries reached. Could not connect to RabbitMQ.');
        }
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return connect(retries - 1);
      }
    };

    return await connect(maxRetries);
  } catch (error) {
    console.error("Error setting up RabbitMQ:", error.message);
    throw new Error(error.message);
  }
};

module.exports = connectToRabbitMQ;
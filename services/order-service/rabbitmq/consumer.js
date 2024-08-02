const amqplib = require("amqplib");
const config = require("../config/config");
const Order = require("../models/order");
const { sendMessage } = require("./producer");

const createOrder = async (products, userId) => {
  let total = 0;
  for (let val of products) {
    total += val.price;
  }
  const newOrder = new Order({
    userId,
    products,
    totalPrice: total,
  });
  await newOrder.save();
  return newOrder;
};

const consumeProductMessages = async () => {
  try {
    const connection = await amqplib.connect(config.amqplibServeUrl);
    const channel = await connection.createChannel();

    await channel.assertQueue("ORDER", { durable: true });

    channel.consume("ORDER", async (message) => {
      if (message !== null) {
        const { products, userId } = JSON.parse(message.content.toString());

        const newOrder = await createOrder(products, userId);

        channel.ack(message);

        sendMessage("PRODUCT", newOrder);
      }
    });
  } catch (error) {
    console.error("Error consuming product messages from RabbitMQ:", error);
  }
};

module.exports = { consumeProductMessages };

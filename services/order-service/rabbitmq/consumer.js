const Order = require("../models/order");
const { sendMessage } = require("./producer");
const connectToRabbitMQ = require("./connection");

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
    const channel = await connectToRabbitMQ();

    channel.consume("ORDER", async (message) => {
      if (message !== null) {
        try {
          const { products, userId } = JSON.parse(message.content.toString());

          const newOrder = await createOrder(products, userId);

          channel.ack(message);

          sendMessage("PRODUCT", newOrder);
        } catch (error) {
          console.log(error.message);
        }
      }
    });
  } catch (error) {
    console.error("Error consuming product messages from RabbitMQ:", error);
  }
};

module.exports = { consumeProductMessages };

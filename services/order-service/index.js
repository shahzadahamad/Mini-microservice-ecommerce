const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const config = require("./config/config");
const orderRoute = require("./routes/order");
const amqplib = require("amqplib");
const { consumeProductMessages } = require("../order-service/rabbitmq/consumer");


app.use(express.json());

app.use("/", orderRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqplib.connect(config.amqplibServeUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.log(error.message);
  }
};

connectToRabbitMQ().then(() => {
  app.listen(PORT, () => {
    consumeProductMessages()
    console.log(`Order-Service at ${PORT}`);
    config.connectDB();
  });  
}).catch((error) => {
  console.log("Initialization falied:" , error);
})




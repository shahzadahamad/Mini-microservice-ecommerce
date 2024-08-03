const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const config = require("./config/config");
const orderRoute = require("./routes/order");
const { consumeProductMessages } = require("../order-service/rabbitmq/consumer");
const connectToRabbitMQ = require("./rabbitmq/connection");


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

connectToRabbitMQ().then(() => {
  console.log("Connected to RabbitMQ");
  app.listen(PORT, () => {
    consumeProductMessages()
    console.log(`Order-Service at ${PORT}`);
    config.connectDB();
  });  
}).catch((error) => {
  console.log("Initialization falied:" , error);
})




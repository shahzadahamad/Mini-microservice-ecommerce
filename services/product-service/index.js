const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const config = require("./config/config");
const productRoute = require("./routes/product");
const connectToRabbitMQ = require("./rabbitmq/connection");

app.use(express.json());

app.use("/", productRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

connectToRabbitMQ()
  .then(() => {
    console.log("Connected to RabbitMQ");
    app.listen(PORT, () => {
      console.log(`Product-Service at ${PORT}`);
      config.connectDB();
    });
  })
  .catch((error) => {
    console.log("Initialization falied:", error);
  });

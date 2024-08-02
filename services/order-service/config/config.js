const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/order-service");
    console.log(`Order-Service DB Connected`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

const amqplibServeUrl = "amqp://localhost:5672";

module.exports = {
  connectDB,
  amqplibServeUrl,
};

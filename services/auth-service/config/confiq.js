const mongoose = require("mongoose");

require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.mongoUrl);
    console.log(`Auth-Service DB Connected`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

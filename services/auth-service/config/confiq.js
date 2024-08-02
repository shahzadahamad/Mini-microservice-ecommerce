const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost/auth-service");
    console.log(`Auth-Service DB Connected`);
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;

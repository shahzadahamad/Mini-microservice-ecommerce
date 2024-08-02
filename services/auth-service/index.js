const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 7070;
const connectDB = require("./config/confiq");
const userRoute = require("./routes/user");

app.use(express.json());

app.use("/", userRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Auth-Service at ${PORT}`);
  connectDB();
});

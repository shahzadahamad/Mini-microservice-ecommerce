const express = require("express");
const orderRoute = express();
const orderController = require("../controllers/order");
const isAuthenticated = require('../middlewares/isAuthenticated');

orderRoute.post('/get-all-orders', isAuthenticated, orderController.getAllOrder)

module.exports = orderRoute;
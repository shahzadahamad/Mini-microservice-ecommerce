const express = require("express");
const productRoute = express();
const productController = require("../controllers/product");
const isAuthenticated = require('../middlewares/isAuthenticated');

productRoute.post('/create', isAuthenticated, productController.createProduct);
productRoute.post('/purchase', isAuthenticated, productController.purchaseProduct);
productRoute.post('/get-all-product',isAuthenticated, productController.getAllProduct);

module.exports = productRoute;
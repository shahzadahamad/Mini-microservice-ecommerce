const express = require("express");
const productRoute = express();
const productController = require("../controllers/product");
const isAuthenticated = require('../middlewares/isAuthenticated');

productRoute.post('/product/create', isAuthenticated, productController.createProduct);
productRoute.post('/product/purchase', isAuthenticated, productController.purchaseProduct);
productRoute.post('/product/get-all-product',isAuthenticated, productController.getAllProduct);

module.exports = productRoute;
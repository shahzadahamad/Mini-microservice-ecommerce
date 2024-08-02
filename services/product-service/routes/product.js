const express = require("express");
const productRoute = express();
const productController = require("../controllers/product");
const isAuthenticated = require('../middlewares/isAuthenticated');

productRoute.post('/create', isAuthenticated, productController.createProduct);
productRoute.post('/purchase', isAuthenticated, productController.purchaseProduct);
productRoute.post('/get-all-product',isAuthenticated, productController.getAllProduct);
productRoute.post('/update-product/:id', isAuthenticated, productController.updateProduct);
productRoute.delete('/delete-product/:id', isAuthenticated, productController.deleteProduct);

module.exports = productRoute;
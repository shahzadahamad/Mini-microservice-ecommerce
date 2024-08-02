const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

const services = { 
  auth: 'http://localhost:7070',  
  product: 'http://localhost:8080', 
  order: 'http://localhost:9090',
};


app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/order', createProxyMiddleware({ target: services.order, changeOrigin: true }));
app.use('/product', createProxyMiddleware({ target: services.product, changeOrigin: true }));


app.listen(PORT,() => {
  console.log(`API Gateway is running on http://localhost:${PORT}`);
})
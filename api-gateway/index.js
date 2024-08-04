const express = require('express');
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 4000;

app.use(cors());

const services = { 
  auth: 'http://auth-service:7070',  
  product: 'http://product-service:8080', 
  order: 'http://order-service:9090',
};

app.get("/", (req, res) => {
  res.send("API Gateway is working");
});

app.use('/auth', createProxyMiddleware({ target: services.auth, changeOrigin: true }));
app.use('/order', createProxyMiddleware({ target: services.order, changeOrigin: true }));
app.use('/product', createProxyMiddleware({ target: services.product, changeOrigin: true }));


app.listen(PORT,() => {
  console.log(`API Gateway is running http://localhost:${PORT}`);
})
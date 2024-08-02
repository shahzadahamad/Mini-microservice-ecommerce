const Product = require("../models/product");
const { sendMessage } = require("../rabbitmq/producer");
const { consumeOrderMessages } = require("../rabbitmq/consumer");
const errorHandler = require("../utils/error");

const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// create a new Product
const createProduct = async (req, res, next) => {
  const { name, description, price } = req.body;
  try {
    const productExist = await Product.findOne({ name });
    if (productExist) return next(errorHandler(401, "Product already exists"));
    const newProduct = new Product({
      name,
      description,
      price,
    });
    newProduct.save();
    return res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};

const purchaseProduct = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const products = await Product.find({ _id: { $in: ids } });

    sendMessage("ORDER", { products, userId: req.user.id });

    const order = await consumeOrderMessages();

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  purchaseProduct,
  getAllProduct,
};

const Product = require("../models/product");
const { sendMessage } = require("../rabbitmq/producer");
const { consumeOrderMessages } = require("../rabbitmq/consumer");
const errorHandler = require("../utils/error");

// get all products
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

// puschase product
const purchaseProduct = async (req, res, next) => {
  try {
    const { ids } = req.body;

    const products = await Product.find({ _id: { $in: ids } });

    await sendMessage("ORDER", { products, userId: req.user.id });

    const order = await consumeOrderMessages();

    return res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

// update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const productExist = await Product.findOne({ name, _id: { $ne: id } });

    if (productExist) return next(errorHandler(401, "Product already exists"));

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          description,
          price,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// delete product
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.deleteOne({ _id: id });
    if(!product) return next(errorHandler(404,'product not found!'))
    res.status(200).json({ status: "product delete successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  purchaseProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};

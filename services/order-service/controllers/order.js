const Order = require("../models/order");

const getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({});

    return res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrder,
};

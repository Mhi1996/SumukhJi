const orderService = require("../service/order.service");

const createOrder = async (req, res) => {
  return orderService.create(req, res);
};


//create index for elastic search

const createProductIndex = async (req, res) => {
  return productService.productIndex(req, res);
};


const getProductById = async (req, res) => {
  return productService.getProductById(req, res);
};

const getProductBy4or5Rating = async (req, res) => {
  return productService.getProductBy4or5Rating(req, res);
};

const updateProductById = async (req, res) => {
  return productService.updateProductById(req, res);
};

const deleteProductById = async (req, res) => {
  return productService.deleteProductById(req, res);
};

module.exports = {
  getProductById,
  createOrder,
  getProductBy4or5Rating,
  updateProductById,
  deleteProductById,
  createProductIndex
};

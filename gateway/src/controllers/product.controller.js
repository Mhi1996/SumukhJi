const productService = require("../service/product.service");

const createProduct = async (req, res) => {
  return productService.create(req, res);
};

//create index for elastic search

const getByStatusController = async (req, res) => {
  return productService.getByStatus(req, res);
};

const getProductById = async (req, res) => {
  return productService.getProductById(req, res);
};

const getAll = async (req, res) => {
  return productService.getAllService(req, res);
};

const getProductBy4or5Rating = async (req, res) => {
  return productService.getProductBy4or5Rating(req, res);
};

const updateProductById = async (req, res) => {
  return productService.updateProductById(req, res);
};


const updateStatus= async (req, res) => {
  return productService.updateStatus(req, res);
};

const deleteProductById = async (req, res) => {
  return productService.deleteProductById(req, res);
};

module.exports = {
  getProductById,
  createProduct,
  getProductBy4or5Rating,
  updateProductById,
  deleteProductById,
  getByStatusController,
  getAll,updateStatus
};

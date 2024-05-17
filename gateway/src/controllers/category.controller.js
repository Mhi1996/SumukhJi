const categoryService = require("../service/category.service");

const create = async (req, res) => {
  return categoryService.create(req, res);
};

const getById = async (req, res) => {
  return categoryService.getById(req, res);
};

const getAll= async (req, res) => {
  return categoryService.getAll(req, res);
};


const getByActiveOrInactiveStatus= async (req, res) => {
  return categoryService.getByActiveOrInactiveStatus(req, res);
};

const updateById = async (req, res) => {
  return categoryService.updateById(req, res);
};

const deleteById = async (req, res) => {
  return categoryService.deleteById(req, res);
};

module.exports = { create, getById, updateById, deleteById,getByActiveOrInactiveStatus,getAll };

const subCategoryService = require("../service/sub_category.service");

const create = async (req, res) => {
  return subCategoryService.create(req, res);
};

const getById = async (req, res) => {
  return subCategoryService.getById(req, res);
};


const getAll = async (req, res) => {
  return subCategoryService.getAll(req, res);
};

const updateById = async (req, res) => {
  return subCategoryService.updateById(req, res);
};

const deleteById = async (req, res) => {
  return subCategoryService.deleteById(req, res);
};

module.exports = { create, getById, updateById, deleteById,getAll };

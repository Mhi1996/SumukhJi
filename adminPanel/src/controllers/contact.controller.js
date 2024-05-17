const contactService = require("../service/Contact.service");

const create = async (req, res) => {
  return contactService.create(req, res);
};

const getById = async (req, res) => {
  return contactService.getById(req, res);
};

const updateById = async (req, res) => {
  return contactService.updateById(req, res);
};

const deleteById = async (req, res) => {
  return contactService.deleteById(req, res);
};

module.exports = { create, getById, updateById, deleteById };

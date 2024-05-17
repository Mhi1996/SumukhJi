const express = require("express");
const route = express.Router();
const categoryController = require("../controllers/category.controller");

route.post("/category/create", (req, res) => {
  categoryController.create(req, res);
});

route.get("/category/getById/:id", (req, res) => {
  categoryController.getById(req, res);
});


route.get("/category/getByStatus/:status", (req, res) => {
  categoryController.getByActiveOrInactiveStatus(req, res);
});

route.get("/category/getAll", (req, res) => {
  categoryController.getAll(req, res);
});


route.patch("/category/updateById", (req, res) => {
  categoryController.updateById(req, res);
});


route.delete("/category/deleteById/:id", (req, res) => {
  categoryController.deleteById(req, res);
});

module.exports = route;

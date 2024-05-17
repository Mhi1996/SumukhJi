const express = require("express");
const route = express.Router();
const subcategoryController = require("../controllers/subCategory.controllers");

route.post("/subCategory/create", (req, res) => {
  subcategoryController.create(req, res);
});

route.get("/subCategory/getById/:id", (req, res) => {
  subcategoryController.getById(req, res);
});


route.get("/subCategory/getAll", (req, res) => {
  subcategoryController.getAll(req, res);
});


route.patch("/subCategory/updateById", (req, res) => {
  subcategoryController.updateById(req, res);
});


route.delete("/subCategory/deleteById/:id", (req, res) => {
  subcategoryController.deleteById(req, res);
});

module.exports = route;

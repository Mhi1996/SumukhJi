const express = require("express");
const route = express.Router();
const orderController = require("../controllers/order.controller");

route.post("/order/create", (req, res) => {
  orderController.createOrder(req, res);
});


route.post("/order", (req, res) => {
  productController.createProductIndex(req, res);
});

route.get("/order/getById/:id", (req, res) => {
  productController.getProductById(req, res);
});


route.get("/order/getByHigherRating", (req, res) => {
  productController.getProductBy4or5Rating(req, res);
});

route.patch("/order/updateById", (req, res) => {
  productController.updateProductById(req, res);
});


route.delete("/order/deleteById/:id", (req, res) => {
  productController.deleteProductById(req, res);
});

module.exports = route;

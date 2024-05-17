const express = require("express");
const route = express.Router();
const productController = require("../controllers/product.controller");

//Use this Code later on when microservice can able to communicate
// route.post("/product/getProduct",UserAuth, (req, res,next) => {
// try {
//   const {id}=req.product;
//   const data=await productController.getProductById(id)
// //   productController.createProduct(req, res);
  
// } catch (error) {
  
// }
// });



route.post("/product/create", (req, res) => {
  productController.createProduct(req, res);
});


route.get("/product/getByStatus/:status", (req, res) => {
  productController.getByStatusController(req, res);
});

route.get("/product/getById/:id", (req, res) => {
  productController.getProductById(req, res);
});

route.get("/product", (req, res) => {
  productController.getAll(req, res);
});


route.get("/product/getByHigherRating", (req, res) => {
  productController.getProductBy4or5Rating(req, res);
});

route.patch("/product/updateById", (req, res) => {
  productController.updateProductById(req, res);
});


route.get("/product/updateStatus", (req, res) => {
  productController.updateStatus(req, res);
});


route.delete("/product/deleteById/:id", (req, res) => {
  productController.deleteProductById(req, res);
});

module.exports = route;

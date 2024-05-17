const express = require("express");
const route = express.Router();
const contactController = require("../controllers/contact.controller");

route.post("/contactUs/create", (req, res) => {
  contactController.create(req, res);
});
route.get("/contactUs/getById/:id", (req, res) => {
  contactController.getById(req, res);
});


route.patch("/contactUs/updateById", (req, res) => {
  contactController.updateById(req, res);
});


route.delete("/contactUs/deleteById/:id", (req, res) => {
  contactController.deleteById(req, res);
});

module.exports = route;

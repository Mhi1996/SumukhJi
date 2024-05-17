const express = require("express");
const route = express.Router();
const userController = require("../controllers/user.controller");

route.post("/user/create", (req, res) => {
  userController.createUser(req, res);
});
route.get("/user/getById/:id", (req, res) => {
  userController.getUserById(req, res);
});

route.get("/user/login", (req, res) => {
  userController.loginUser(req, res);
});

route.patch("/user/updateById", (req, res) => {
  userController.updateUserById(req, res);
});


route.patch("/user/changePassword/:id/:pwd/:newPwd", (req, res) => {
  userController.changeUserPassword1(req, res);
});
route.delete("/user/deleteById/:id", (req, res) => {
  userController.deleteUserById(req, res);
});

module.exports = route;

const userService = require("../service/user.service");

const createUser = async (req, res) => {
  return userService.createUser(req,res);
};

const getUserById = async (req, res) => {
  return userService.getUserById(req,res);
};

const updateUserById = async (req, res) => {
  return userService.updateUserById(req,res);
};


const changeUserPassword1 = async (req, res) => {
  return userService.changeUserPassword(req,res);
};

const loginUser = async (req, res) => {
  return userService.loginUser(req,res);
};

const deleteUserById = async (req, res) => {
  return userService.deleteUserById(req,res);
};


module.exports = { getUserById, createUser, updateUserById, deleteUserById,loginUser,changeUserPassword1 };

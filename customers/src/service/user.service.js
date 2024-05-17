const mongoose = require("mongoose").ObjectId;
const { User, createToken, hashPassword } = require("../models/user.model");

const createUser = async function (req, res) {
  try {
    let { name, username, password, email, isAdmin, phone } = req.body;
    // const  pwd = hashPassword(password);
    //   console.log(`pwd==== ${pwd}`);
    let createUser = new User({
      name: name,
      username: username,
      password: password,
      email: email,
      isAdmin: isAdmin,
      phone: phone,
    });
    createUser
      .save()
      .then((createUser) => {
        console.log(`user successfully created ${createUser}`);
      })
      .catch((err) => {
        console.log(`Error ${err}`);
      });

    console.log(`saveUser==== ${createUser}`);
    const token = await createToken(createToken);
    console.log(`user token  ${token}`);
    if (!createUser) res.status(404).send({ msg: "User not Added" });
    res.status(200).send({ result: createUser });
  } catch (error) {
    // const code=error.code || 500
    //res.status(500).send(error.message);
    throw error;
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id, status: "Active" });
    if (!user) res.status(404).send({ msg: "User not found" });
    res
      .status(200)
      .send({ result: user, status: 200, message: "Data fetch successfully" });
  } catch (error) {
    throw error;
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
      password: data.password,
      status: "Active",
    });
    if (!user) res.status(404).send({ msg: "User not found" });
    res
      .status(200)
      .send({ result: user, status: 200, message: "Data fetch successfully" });
  } catch (error) {
    res.send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

const updateUserById = async (req, res) => {
  try {
    const data = req.body;
    const res1 = await User.findOneAndUpdate(
      { _id: data._id, status: "Active" },
      { name: data.name, email: data.email, username: data.username },
      { new: true }
    );
    if (!res1) return "User not found";
    console.log(`data updated ${res1}`);
    res.send({
      result: res1,
      status: 200,
      message: "Data update successfully",
    });
  } catch (error) {
    res.send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const pwd = req.params.pwd;
    const confirmPwd = req.params.newPwd;
    const okPwd = pwd != confirmPwd ? false : confirmPwd; //match password with confirm password
    if (okPwd == false) {
      setTimeout(() => {
        res.send("password is not matched with confirm password");
        res.end();
      }, 2000);
    }
    const res1 = await User.findOneAndUpdate(
      { _id: id, status: "Active" },
      { password: confirmPwd },
      { new: true }
    );

    if (!res1) return "User not found";
    console.log(`data updated ${res1}`);

    res.send({
      // result: res1,
      status: 200,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const res1 = await User.findByIdAndDelete({ _id: id, status: "Active" });
    if (!res1) return "User not found";
    res.send({
      status: 200,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  changeUserPassword,
};

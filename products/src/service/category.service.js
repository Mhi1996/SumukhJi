const mongoose = require("mongoose").ObjectId;
const { Category } = require("../models/category.model");

const create = async function (req, res) {
  try {
    let { title, description } = req.body;
    let createCategory = new Category({
      title: title,
      description: description,
    });
    createCategory
      .save()
      .then((createCategory) => {
        console.log(`category successfully created ${createCategory}`);
        res
          .status(200)
          .send({ msg: "Category Created", result: createCategory });
      })
      .catch((err) => {
        res.status(404).send({ msg: "Category not Created", error: err });
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById({ _id: id, status: "Active" });
    if (!category) res.status(404).send({ msg: "Category not found" });
    res.status(200).send({
      result: category,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getByActiveOrInactiveStatus = async (req, res) => {
  try {
    const status1 = req.params.status;
    const category = await Category.findOne({ status: status1 }).populate({
      title: 1,
      description: 1,
    });
    if (!category) res.status(404).send({ msg: "Category not found" });
    res.status(200).send({
      result: category,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }7
};

const getAll = async (req, res) => {
  try {
    const category = await Category.find();
    if (!category) res.status(404).send({ msg: "Category not found" });
    res.status(200).send({
      result: category,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }7
};

const updateById = async (req, res) => {
  try {
    const data = req.body;
    const res1 = await Category.findOneAndUpdate(
      { _id: data._id, status: "Active" },
      {
        title: data.title,
        description: data.description,
      },
      { new: true }
    );
    if (!res1) return "Category not found";
    console.log(`data updated ${res1}`);
    res.send({
      result: res1,
      status: 200,
      message: "Data update successfully",
    });
  } catch (error) {
    res.status(400).send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const res1 = await Category.findByIdAndDelete({
      _id: id,
      status: "Active",
    });
    if (!res1) return "Category not found";
    res.send({
      status: 200,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.satus(400).send({
      error: error,
      status: 401,
      message: "Error",
    });
  }
};

module.exports = {
  create,
  getById,
  updateById,
  deleteById,
  getByActiveOrInactiveStatus,getAll
};

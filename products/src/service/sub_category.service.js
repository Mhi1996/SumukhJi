const mongoose = require("mongoose").ObjectId;
const { Category } = require("../models/category.model");
const { Sub_Category } = require("../models/subCategory.model");

const create = async function (req, res) {
  try {
    let { title, description, categoryId } = req.body;
    const validCategoryId = await Category.findById({ _id: categoryId });
    if (!validCategoryId) return "Please enter valid category Id.";
    let createSubCategory = new Sub_Category({
      title: title,
      description: description,
      categoryId: categoryId,
    });
    createSubCategory
      .save()
      .then((createSubCategory) => {
        console.log(`sub category successfully created ${createSubCategory}`);
        res.send({
          status: 200,
          msg: "Sub Category Created",
          result: createSubCategory,
        });
      })
      .catch((err) => {
        res.status(404).send({ msg: "Sub Category not Created", error: err });
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    let sub_category = await Sub_Category.findById({
      _id: id,
      status: "Active",
    }).populate({ path: "categoryId", select: ["title", "description"] });
    if (!sub_category) res.send({ status: 404, msg: "Category not found" });
    res.send({
      result: sub_category,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getAll = async (req, res) => {
  try {
    let sub_category = await Sub_Category.find().populate({ path: "categoryId", select: ["title", "description"] });
    if (!sub_category) res.send({ status: 404, msg: "Category not found" });
    res.send({
      result: sub_category,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const updateById = async (req, res) => {
  try {
    const { _id, categoryId, description, title } = req.body;
    const res1 = await Sub_Category.findOneAndUpdate(
      { _id: _id, status: "Active", categoryId: categoryId },
      {
        title: title,
        description: description,
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
    const res1 = await Sub_Category.findByIdAndDelete({
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
  updateById,getAll,
  deleteById,
};

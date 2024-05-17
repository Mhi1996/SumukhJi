const mongoose = require("mongoose").ObjectId;
const { ContactUs } = require("../models/ContactUs.model");

const create = async function (req, res) {
  try {
    let {
      email,
      phone,
      facebook,
      instagram,
      twitter,
      youtube,
      linkedIn,
      address,
    } = req.body;
    let createContact = new ContactUs({
      email: email,
      facebook: facebook,
      instagram: instagram,
      twitter: twitter,
      youtube: youtube,
      linkedIn: linkedIn,
      phone: phone,
      address: address,
    });
    createContact
      .save()
      .then((createContact) => {
        console.log(`Contact Us successfully created ${createContact}`);
        res
          .status(200)
          .send({ msg: "Contact Us Created", result: createContact });
      })
      .catch((err) => {
        res.status(404).send({ msg: "Contact Us not Created", error: err });
      });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = await ContactUs.findById({ _id: id, status: "Active" });
    if (!contact) res.status(404).send({ msg: "Contact Us not found" });
    res.status(200).send({
      result: contact,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const updateById = async (req, res) => {
  try {
    const {
      email,
      phone,
      facebook,
      twitter,
      address,
      linkedIn,
      youtube,
      instagram,
      _id,
    } = req.body;
    const res1 = await ContactUs.findOneAndUpdate(
      { _id: _id, status: "Active" },
      {
        email: email,
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
        youtube: youtube,
        linkedIn: linkedIn,
        phone: phone,
        address: address,
      },
      { new: true }
    );
    if (!res1) return "Contact Us not found";
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
    const res1 = await ContactUs.findByIdAndDelete({
      _id: id,
      status: "Active",
    });
    if (!res1) return "Contact us not found";
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
};

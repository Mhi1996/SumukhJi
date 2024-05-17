const mongoose = require("mongoose");

const contactUs_Schema = new mongoose.Schema(
  {
    email: { type: String },
    phone: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    youTube: { type: String },
    linkedIn: { type: String },
    address: { type: String },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

const ContactUs = new mongoose.model("ContactUs", contactUs_Schema);

module.exports = { ContactUs };

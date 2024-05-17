const mongoose = require("mongoose");


const sub_category_Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    categoryId:{type:mongoose.Types.ObjectId,ref:"Category"},
    status: { type: String, default: "Active" },
    },
  { timestamps: true }
);




const Sub_Category= new mongoose.model("Sub_Category", sub_category_Schema);
module.exports = {Sub_Category };

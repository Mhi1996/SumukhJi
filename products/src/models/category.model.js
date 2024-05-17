const mongoose = require("mongoose");
//const connectDB_To_Sumukh_Category = require("./../config/category_DB_Connection");

const category_Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

//const catedb = mongoose.connection.useDb("connectDB_To_Sumukh_Category");
const Category = new mongoose.model("Category", category_Schema);
module.exports = { Category };

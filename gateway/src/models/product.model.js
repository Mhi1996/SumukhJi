const mongoose = require("mongoose");
// const productDB = require("./../config/product_DB_Connection");

const product_Schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    sku: { type: String, require: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: "Category" },
    sub_categoryId: { type: mongoose.Types.ObjectId, ref: "Sub_Category" },
    description: { type: String },
    status: { type: String, default: "Active" },
    price: { type: String },
    image: [{ mainImage: { type: String }, subImage: [{ type: String }] }],
    discountType: { type: String }, // discount types for example : percentage, amount,coupan
    deliveryCharge: { type: String }, //delivery charges: free or amount
    rating: { type: Number, min: 1, max: 5 }, //product rating
    comment: { type: String },
    inStock: { type: Boolean },
    quantity: { type: Number },
  },
  { timestamps: true }
);

//const proddb = mongoose.connection.useDb("productDB");

const Product = new mongoose.model("Product", product_Schema);


module.exports = { Product };

const mongoose = require("mongoose");
// const productDB = require("./../config/product_DB_Connection");

const order_Schema = new mongoose.Schema(
  {
    orderId: { type: String },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Delete"],
    },
    //image: [{ mainImage: { type: String }, subImage: [{ type: String }] }],
    // discountType: { type: String }, // discount types for example : percentage, amount,coupan
    deliveryCharge: { type: Number }, //delivery charges:amount
    quantity: { type: Number },
    productEachPrice:{type:Number},
    totalAmount: { type: Number },
    orderDate: { type: String },
  },
  { timestamps: true }
);

//const proddb = mongoose.connection.useDb("productDB");

const Order = new mongoose.model("Order", order_Schema);

module.exports = { Order };

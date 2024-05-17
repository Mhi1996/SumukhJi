const mongoose = require("mongoose").ObjectId;
const { json } = require("body-parser");
const { Product } = require("../models/product.model");
const { Client } = require("@elastic/elasticsearch");
const { redisClient } = require("../config/redis");
const elasticClient = new Client({ node: "http://localhost:8003" }); // Replace with your Elasticsearch server address

// //product mapping for creating the elastic index for product
// const productMapping = {
//   properties: {
//     title: { type: "text" },
//     price: { type: "float" },
//     description: { type: "text" },
//     rating: { type: "number" },
//     sku: { type: "text" },
//     categoryId: { type: "text" },
//     sub_categoryId: { type: "text" },
//     status: { type: "text" },
//     image: { type: "text" },
//     discountType: { type: "text" }, // discount types for example : percentage, amount,coupan
//     deliveryCharge: { type: "float" }, //delivery charges: free or amount
//     rating: { type: "numder" }, //product rating
//     comment: { type: "text" },
//     inStock: { type: "text" },
//     quantity: { type: "number" },
//   },
// };

// //create product indexing
// const createIndex = async () => {
//   try {
//     const { body: result } = await elasticClient.indices.create({
//       index: "product",
//       body: {
//         mappings: {
//           properties: productMapping,
//         },
//       },
//     });
//     console.log("Created index:", result);
//   } catch (error) {
//     if (error.meta && error.meta.connection) {
//       console.error("ConnectionError:", error.meta.connection);
//     } else {
//       console.error("Error creating index:", error);
//     }
//   }
// };

// // product indexing
// const productIndex = async (req, res) => {
//   try {
//     const { body: product } = req;
//     const { body: result } = await elasticClient.index({
//       index: "product",
//       body: product,
//     });
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product" });
//   }
// };

const create = async function (req, res) {
  try {
    let {
      title,
      description,
      sku,
      price,
      categoryId,
      sub_categoryId,
      discountType,
      deliveryCharge,
      rating,
      comment,
      inStock,
      quantity,
    } = req.body;
    // const  pwd = hashPassword(password);
    //   console.log(`pwd==== ${pwd}`);
    let createProduct = new Product({
      title: title,
      description: description,
      sku: sku,
      price: price,
      categoryId: categoryId,
      sub_categoryId: sub_categoryId,
      discountType: discountType,
      deliveryCharge: deliveryCharge,
      rating: rating,
      comment: comment,
      quantity: quantity,
      inStock: inStock,
    });
    createProduct.save();
    const { body: result } = await elasticClient.index({
      index: "products",
      body: productMapping,
    });
    console.log(json(result));
    // .then((createProduct) => {
    //   console.log(`product successfully created ${createProduct}`);

    // })
    // .catch((err) => {
    //   console.log(`Error ${err}`);
    // });

    if (!createProduct) res.status(404).send({ msg: "Product not Created" });
    res.status(200).send({ result: createProduct });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id, status: "Active" })
      .populate({ path: "categoryId", select: ["title", "description"] })
      .populate({ path: "sub_categoryId", select: ["title", "description"] });
    if (!product) res.status(404).send({ msg: "Product not found" });
    res.status(200).send({
      result: product,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getAllService = async (req, res) => {
  try {
    console.log(`request === ${req}`);
    // redisClient.setex("product", 1000, req);
    //  redisClient.set("product", () => {
    //  console.log(`inside the redisClient`);
    // console.log(cachedProduct);
    // if (err) throw err;
    // if (cachedProduct != null) {
    //   console.log(`Cache hit ${json.parse(cachedProduct)}`);
    //   res.json(JSON.parse(cachedProduct));
    // }
    //  else {
    const products = await Product.find()
      .populate({ path: "categoryId", select: ["title", "description"] })
      .populate({
        path: "sub_categoryId",
        select: ["title", "description"],
      });
    //   console.log(`product ${JSON.stringify(products)}`);
    redisClient.setex("product", 1000, JSON.stringify(products));
    //  res.json(products);
    // }
    //  res.json(product);
    //});

    //if (!product) res.status(404).send({ msg: "Product not found" });

    // res.status(200).send({
    //   result: product,
    //   status: 200,
    //   message: "Data fetch successfully",
    // });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getProductByText = async (req, res) => {
  try {
    const id = req.params.productName;

    const product = await Product.find({ _id: id, status: "Active" })
      .populate({ path: "categoryId", select: ["title", "description"] })
      .populate({ path: "sub_categoryId", select: ["title", "description"] });
    if (!product) res.status(404).send({ msg: "Product not found" });
    res.status(200).send({
      result: product,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const product = await Product.find({ status: status });
    if (!product || product == null) {
      res.status(404).send({ msg: "Category not found" });
    }
    if (product !== null) {
      console.log(`redis cli connects`);
      const productString = JSON.stringify(product);

      redisClient.set(status, productString);
      // console.log(
      //   `we fetched the data successfully===== ${JSON.parse(product)}`
      // );
      res.send(product);
    } // res.status(200).send({
    //   result: product,
    //   status: 200,
    //   message: "Data fetch successfully",
    // });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

//get by higher rating
const getProductBy4or5Rating = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.find({
      rating: { $gte: 4 },
      status: "Active",
    })
      .populate({ path: "categoryId", select: ["title", "description"] })
      .populate({ path: "sub_categoryId", select: ["title", "description"] });
    if (!product) res.status(404).send({ msg: "Product not found" });
    res.status(200).send({
      result: product,
      status: 200,
      message: "Data fetch successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
};

const updateProductById = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      categoryId,
      sub_categoryId,
      price,
      sku,
      rating,
      deliveryCharge,
      discountType,
      comment,
      inStock,
      quantity,
    } = req.body;
    const res1 = await Product.findOneAndUpdate(
      {
        _id: _id,
        status: "Active",
        categoryId: categoryId,
        sub_categoryId: sub_categoryId,
      },
      {
        title: title,
        description: description,
        price: price,
        sku: sku,
        categoryId: categoryId,
        sub_categoryId: sub_categoryId,
        discountType: discountType,
        deliveryCharge: deliveryCharge,
        rating: rating,
        comment: comment,
        inStock: inStock,
        quantity: quantity,
      },
      { new: true }
    );
    if (!res1) return "Product not found";
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

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const res1 = await Product.findByIdAndDelete({ _id: id, status: "Active" });
    if (!res1) return "Product not found";
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
//only for learning
const updateStatus = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $match: { status: "Active" } },
      { $set: { status: "InActive" } },
      { $out: "Product" }
      
    ]);
    console.log(`product updated status ==== ${result}`);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  create,
  getProductById,
  updateProductById,
  getProductBy4or5Rating,
  deleteProductById,
  // createIndex,
  // productIndex,
  getAllService,
  getByStatus,
  updateStatus,
};

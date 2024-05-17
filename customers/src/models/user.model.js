const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword = "your_password_here";

const user_Schema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    isAdmin: { type: Boolean, required: true },
    phone: { type: String, required: true, unique: true },
    status: { type: String, default: "Active" },
    password: { type: String, required: true, min: 6 },
    gender: { type: String, val: ["Male", "Female", "Other"] },
    username: { type: String, min: 4, max: 20, unique: true, required: true },
  },
  { timestamps: true }
);

const userWishlistAndShared_Schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    wishlistInfo: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        isRemoved: { type: Boolean },
      },
    ],
    sharedInfo: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "Product" },
        sharedDate: { type: Date }, //On which date product was shared
        userInfo: [
          {
            phone: { type: String },
            email: { type: String },
            name: { type: String },
            sharedPlatform: { type: String }, //platform could be whatsup, facebook, instagram etc
          },
        ],
      },
    ],
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);
// user_Schema.virtual('name.full').get(function(){
//   return _.startCase(this.name.first + ' ' + this.name.last)
// })

const createToken = async (user) => {
  try {
    const token = jsonwebtoken.sign({ user }, process.env.JWT_SECRET_KEY, {
      expiresIn: 100000,
    });
    console.log(`token ${token}`);
    return token;
  } catch (error) {
    console.log(`jwt error ${error}`);
    throw error;
  }
};

const verifyToken = async (userToken) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(
      userToken,
      process.env.JWT_SECRET_KEY,
      (user, error) => {
        if (user) {
          resolve(user);
        } else {
          reject(error);
        }
      }
    );
  });
};

// async function hashPassword(password){
//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log(`hashPwd ==== ${hashedPassword}`)
//     return hashedPassword;
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     throw error;
//   }
// }
// hashPassword(password)
//   .then((hashedPassword) => {
//     console.log('Hashed password:', hashedPassword);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

const User = new mongoose.model("User", user_Schema);
const UserWishListAndShared = new mongoose.model(
  "UserWishListAndShared",
  userWishlistAndShared_Schema
);

module.exports = { User, createToken, verifyToken, UserWishListAndShared };

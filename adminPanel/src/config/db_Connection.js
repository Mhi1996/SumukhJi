const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connectDB_To_Sumukh_Product = async function () {
  try {
    const res = mongoose.connect(process.env.MONGO_DB_ATLAS_SUMUKH_ADMINPANEL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    if (res) {
      console.log("Sumukh_AdminPanel DB  connected successfully");
    }

    return "DB not connected";
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB_To_Sumukh_Product;

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB_To_Sumukh_User = async function () {
  try {
    const res = mongoose.connect(process.env.MONGO_DB_ATLAS_SUMUKH_USER, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    if (res) {
      console.log("Sumukh_customer DB  connected successfully");
    }

    return "DB not connected";
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB_To_Sumukh_User;

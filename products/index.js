const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const db_Connection = require("./src/config/db_Connection");
const dotenv = require("dotenv").config();
//const categoryDB = require("./src/config/category_DB_Connection");
const cors = require("cors");
const productRoute = require("./src/routes/product.route");
const categoryRoute = require("./src/routes/category.route");
const subCategoryRoute = require("./src/routes/sub_category.route");
const { setupLogging } = require("./src/config/log");
// const {
//   connectProducer,
//   sendMessage,
// } = require("./src/config/kafkaCommunication");
//const redisClient = require("./src/config/redis");
// const helmet = require("helmet");
//const morgan = require("morgan");

// app.use(helmet());
// app.use(morgan("common"));
setupLogging(app);
app.use(cors());
db_Connection();
//redisClient.cache();
//kafka product producer
// async function startProductModule() {
//   await connectProducer();
// }
// startProductModule();

//categoryDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(productRoute);
app.use(categoryRoute);
app.use(subCategoryRoute);

app.use("/", (req, res) => {
  res.status(200).json({ msg: "Hello from product" });
});

app.listen("8003", () => {
  console.log(`Product server is running on port 8003`);
});

module.exports = app;

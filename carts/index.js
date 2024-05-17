const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db_Connection");
const cors = require("cors");
const route = require("./src/routes/order.route");
// const helmet = require("helmet");
//const morgan = require("morgan");

// app.use(helmet());
// app.use(morgan("common"));
app.use(cors());
connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(route);

app.listen("8001", () => {
  console.log(`Cart server is running on port 8001`);
});

module.exports = app;

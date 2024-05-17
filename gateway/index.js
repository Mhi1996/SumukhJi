const express = require("express");
const app = express();
app.use(express.json());
//const bodyParser = require("body-parser");
//const connectDB = require("./Network/db");
const cors = require("cors");
const proxy=require('express-http-proxy');
// const route = require("./route");
// const helmet = require("helmet");
//const morgan = require("morgan");

// app.use(helmet());
// app.use(morgan("common"));
app.use(cors());
app.use(express.json());
app.use('/cart',proxy('http://localhost:8001'));
app.use('/customer',proxy('http://localhost:8002'));
app.use('/product',proxy('http://localhost:8003'));
app.use('/admin',proxy('http://localhost:8005'));
//connectDB();
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(route);


app.use("/", (req, res) => {
  res.status(200).json({ msg: "Hello from gatway" });
});

app.listen("8000", () => {
  console.log(`Gateway server is running on port 8000`);
});

module.exports = app;

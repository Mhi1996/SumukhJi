const express = require("express");
const app = express();
app.use(express.json());
const bodyParser = require("body-parser");
const db_Connection = require("./src/config/db_Connection");
const cors = require("cors");
const contactRoute = require("./src/routes/contact.route");

app.use(cors());
db_Connection();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(contactRoute);


app.listen("8005", () => {
  console.log(`Admin Panel is running on port 8005`);
});

module.exports = app;

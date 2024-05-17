const express = require("express");
const app = express();
app.use(express.json());
//const bodyParser = require("body-parser");
const connectDB_To_Sumukh_User = require("./src/config/dbConnection");
const cors = require("cors");
const route = require("./src/routes/user.route");
// const helmet = require("helmet");
//const morgan = require("morgan");
const { connectConsumer } = require("./src/config/kafkaCommunication");
// app.use(helmet());
// app.use(morgan("common"));
app.use(cors());
connectDB_To_Sumukh_User();

//kafka consumer customer
async function startCustomerModule() {
  await connectConsumer();
  console.log(`consumer customer connected====`);
}
startCustomerModule();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(route);

app.listen("8002", () => {
  console.log(`Customer server is running on port 8002`);
});

module.exports = app;

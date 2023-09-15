const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connect = require("./config/db");
const morgan = require("morgan");
const router = require("./routes/authRoute");

//config env
dotenv.config();

// database config
connect();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//router
app.use(router);

//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`listen PORT ${process.env.DEV_MODE} no ${PORT}`.bgYellow.bold);
});



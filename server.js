const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const cors =require("cors")
const authRoutes  = require("./routes/authRoute");
const categoryRoutes  = require("./routes/categoryRoute");
const productRoutes  = require("./routes/productRouter");

//config env
dotenv.config();

// database config
connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

//Routes 
app.use("/api/v1/auth",authRoutes );
app.use("/api/v1/category",categoryRoutes );
app.use("/api/v1/product",productRoutes );
//port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(`listen PORT ${process.env.DEV_MODE} no ${PORT}`.bgYellow.bold);
});



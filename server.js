const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Config port
const PORT = process.env.PORT || 5000;

// Route Files
const bootCampsRoutes = require("./routes/bootCamps");

const app = express();

// Dev logging middleware
app.use(morgan("dev"));

// Mount routers
app.use("/api/v1/bootCamps", bootCampsRoutes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));

const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Config port
const PORT = process.env.PORT || 5000;

// Route Files
const bootCampsRoutes = require("./routes/bootCamps");
const coursesRoutes = require("./routes/courses");

const app = express();

//  Body parser
app.use(express.json());

// Dev logging middleware
app.use(morgan("dev"));

// Mount routers
app.use("/api/v1/bootCamps", bootCampsRoutes);
app.use("/api/v1/courses", coursesRoutes);

app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`.yellow.bold));

const express = require("express");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

const bootCamps = require("./routes/bootcamp");

app.use("/api/v1/bootCamps", bootCamps);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));

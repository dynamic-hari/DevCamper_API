const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Load models
const BootCamp = require("./models/BootCamp");
const Course = require("./models/Course");
const User = require("./models/User");
// const Review = require("./models/Review");

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON files
const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootCamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

// const users = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
// );

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
// );

// Import into DB
const importData = async () => {
  try {
    await BootCamp.create(bootCamps);
    await Course.create(courses);
    // await User.create(users);
    // await Review.create(reviews);
    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    // await Course.deleteMany();
    // await User.deleteMany();
    // await Review.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

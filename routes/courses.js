const express = require("express");
const router = express.Router({ mergeParams: true });
const { getCourses } = require("../controllers/courses");

// Cleaner way of calling

router.route("/").get(getCourses);
// router
//   .route("/:id")
//   .get(getBootCampListById)

module.exports = router;

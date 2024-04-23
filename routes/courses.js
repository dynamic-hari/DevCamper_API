const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/courses");

// Cleaner way of calling

router.route("/").get(getCourses).post(addCourse);

router
  .route("/:id")
  .get(getCourseById)
  .put(updateCourseById)
  .delete(deleteCourseById);

module.exports = router;

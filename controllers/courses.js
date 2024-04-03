const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");

/**
 *
 * @desc Get all courses
 * @route GET /api/v1/courses/
 * @route GET /api/v1/bootCamps/:bootCampId/course
 */
const getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootCampId) {
    query = Course.find({ bootCamp: req.params.bootCampId });
  } else {
    query = Course.find();
  }

  // Executing query
  const courses = await query;

  res.status(200).send({
    success: true,
    message: "Data received successfully",
    totalCount: courses.length,
    data: courses,
  });
});

module.exports = { getCourses };

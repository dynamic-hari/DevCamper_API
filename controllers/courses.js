const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Course = require("../models/Course");
const BootCamp = require("../models/BootCamp");

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
    query = Course.find().populate({
      path: "bootCamp",
      select: "name description",
    });
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

/**
 *
 * @desc Get Course by ID
 * @route GET /api/v1/courses/:id
 */
const getCourseById = asyncHandler(async (req, res, next) => {
  const courseData = await Course.findById(req.params.id).populate({
    path: "bootCamp",
    select: "name description",
  });

  if (!courseData) {
    return next(
      new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).send({
    success: true,
    message: "Data received successfully",
    data: courseData,
  });
});

/**
 *
 * @desc Add Course
 * @route POST /api/v1/bootCamps/:bootCampId/courses
 */
const addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootCamp = req.params.bootCampId;

  const bootCamp = BootCamp.findById(req.params.bootCampId);

  if (!bootCamp) {
    return next(
      new ErrorResponse(
        `No BootCamp with the id of ${req.params.bootCampId}`,
        400
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).send({
    success: true,
    message: "Created new Course",
    data: course,
  });
});

/**
 *
 * @desc Update Course by ID
 * @route PUT /api/v1/courses/:id
 */
const updateCourseById = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return new ErrorResponse(`No Course with the id of ${req.params.id}`, 404);
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).send({
    success: true,
    message: `Updated Course ${req.params.id}`,
    data: course,
  });
});

/**
 *
 * @desc Delete Course by ID
 * @route DELETE /api/v1/courses/:id
 */
const deleteCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course not found with the id of ${req.params.id}`, 404)
    );
  }

  await course.deleteOne();

  res.status(200).send({
    success: true,
    message: `Deleted Course ${req.params.id}`,
    data: {},
  });
});

module.exports = {
  getCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};

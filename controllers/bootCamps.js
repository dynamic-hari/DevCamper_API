const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/BootCamp");

/**
 *
 * @desc Get all BootCamps
 * @route GET /api/v1/bootCamps/
 */
const getBootCampList = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over remove fields and remove from Query
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create Query String
  let queryString = JSON.stringify(reqQuery);

  // Create operators
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resources
  query = BootCamp.find(JSON.parse(queryString)).populate("courses");

  // Select fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  //  Sorting
  if (req.query.sort) {
    const reqField = req.query.sort.split(",").join(" ");
    query = query.sort(reqField);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Executing query
  const bootCamps = await query;

  res.status(200).send({
    success: true,
    message: "Data received successfully",
    totalCount: bootCamps.length,
    data: bootCamps,
  });
});

/**
 *
 * @desc Get BootCamp by ID
 * @route GET /api/v1/bootCamps/:id
 */
const getBootCampListById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);

  if (!bootCamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).send({
    success: true,
    message: "Data received successfully",
    data: bootCamp,
  });
});

/**
 *
 * @desc Add BootCamp
 * @route POST /api/v1/bootCamps/
 */
const addBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.create(req.body);
  res.status(200).send({
    success: true,
    message: "Created new BootCamp",
    data: bootCamp,
  });
});

/**
 *
 * @desc Update BootCamp by ID
 * @route PUT /api/v1/bootCamps/:id
 */
const updateBootCampById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).send({
    success: true,
    message: `Updated BootCamp ${req.params.id}`,
    data: bootCamp,
  });
});

/**
 *
 * @desc Delete BootCamp by ID
 * @route DELETE /api/v1/bootCamps/:id
 */
const deleteBootCampById = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);

  if (!bootCamp) {
    return next(
      new ErrorResponse(
        `BootCamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  await bootCamp.deleteOne();

  res.status(200).send({
    success: true,
    message: `Deleted BootCamp ${req.params.id}`,
    data: {},
  });
});

/**
 *
 * @desc Upload photo for bootCamp
 * @route  PUT /api/v1/bootCamps/:id/photo
 */
const uploadBootCampPhoto = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);
  console.log("🚀 ~ uploadBootCampPhoto ~ bootCamp:", bootCamp);

  if (!bootCamp) {
    return next(
      new ErrorResponse(
        `BootCamp not found with the id of ${req.params.id}`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }
  console.log("🚀 ~ uploadBootCampPhoto ~ req.files:", req.files);

  const file = req.files.file;
  console.log("🚀 ~ uploadBootCampPhoto ~ file:", file);

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootCamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await BootCamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});

module.exports = {
  getBootCampList,
  getBootCampListById,
  addBootCamp,
  updateBootCampById,
  deleteBootCampById,
  uploadBootCampPhoto,
};

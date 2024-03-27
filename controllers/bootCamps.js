const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../models/BootCamp");

/**
 *
 * @desc Get all BootCamps
 * @route GET /api/v1/bootCamps/
 */
const getBootCampList = asyncHandler(async (req, res, next) => {
  const bootCamps = await BootCamp.find();

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
  await BootCamp.findByIdAndDelete(req.params.id);
  res.status(200).send({
    success: true,
    message: `Deleted BootCamp ${req.params.id}`,
    data: {},
  });
});

module.exports = {
  getBootCampList,
  getBootCampListById,
  addBootCamp,
  updateBootCampById,
  deleteBootCampById,
};

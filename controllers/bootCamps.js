const BootCamp = require("../models/BootCamp");

/**
 *
 * @desc Get all BootCamps
 * @route GET /api/v1/bootCamps/
 */
const getBootCampList = async (req, res) => {
  try {
    const bootCamps = await BootCamp.find();
    res.status(200).send({
      success: true,
      message: "Data received successfully",
      totalCount: bootCamps.length,
      data: bootCamps,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "An error occurred!", error: err });
  }
};

/**
 *
 * @desc Get BootCamp by ID
 * @route GET /api/v1/bootCamps/:id
 */
const getBootCampListById = async (req, res) => {
  try {
    const bootCamps = await BootCamp.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Data received successfully",
      data: bootCamps,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "An error occurred!",
      error: err,
    });
  }
};

/**
 *
 * @desc Add BootCamp
 * @route POST /api/v1/bootCamps/
 */
const addBootCamp = async (req, res) => {
  try {
    const bootCamp = await BootCamp.create(req.body);
    res.status(200).send({
      success: true,
      message: "Created new BootCamp",
      data: bootCamp,
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "An error occurred!", error: err });
  }
};

/**
 *
 * @desc Update BootCamp by ID
 * @route PUT /api/v1/bootCamps/:id
 */
const updateBootCampById = async (req, res) => {
  try {
    const bootCamp = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      success: true,
      message: `Updated BootCamp ${req.params.id}`,
      data: bootCamp,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "An error occurred!",
      error: err,
    });
  }
};

/**
 *
 * @desc Delete BootCamp by ID
 * @route DELETE /api/v1/bootCamps/:id
 */
const deleteBootCampById = async (req, res) => {
  try {
    const bootCamp = await BootCamp.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: `Deleted BootCamp ${req.params.id}`,
      data: {},
    });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, message: "An error occurred!", error: err });
  }
};

module.exports = {
  getBootCampList,
  getBootCampListById,
  addBootCamp,
  updateBootCampById,
  deleteBootCampById,
};

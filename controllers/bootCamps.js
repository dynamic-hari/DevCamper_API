/**
 *
 * @desc Get all BootCamps
 * @route GET /api/v1/bootCamps/
 */
const getBootCampList = async (req, res) => {
  try {
    res.status(200).send({ success: true, message: "Show all BootCamps " });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "An error occurred!", error: error });
  }
};

/**
 *
 * @desc Get BootCamp by ID
 * @route GET /api/v1/bootCamps/:id
 */
const getBootCampListById = async (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, message: `Get BootCamp ${req.params.id}` });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "An error occurred!", error: error });
  }
};

/**
 *
 * @desc Add BootCamp
 * @route POST /api/v1/bootCamps/
 */
const addBootCamp = async (req, res) => {
  try {
    res.status(200).send({ success: true, message: "Created new BootCamp" });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "An error occurred!", error: error });
  }
};

/**
 *
 * @desc Update BootCamp by ID
 * @route PUT /api/v1/bootCamps/:id
 */
const updateBootCampById = async (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, message: `Updated BootCamp ${req.params.id}` });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "An error occurred!", error: error });
  }
};

/**
 *
 * @desc Delete BootCamp by ID
 * @route DELETE /api/v1/bootCamps/:id
 */
const deleteBootCampById = async (req, res) => {
  try {
    res
      .status(200)
      .send({ success: true, message: `Deleted BootCamp ${req.params.id}` });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "An error occurred!", error: error });
  }
};

module.exports = {
  getBootCampList,
  getBootCampListById,
  addBootCamp,
  updateBootCampById,
  deleteBootCampById,
};

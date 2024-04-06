const express = require("express");
const router = express.Router();

const {
  addBootCamp,
  getBootCampList,
  getBootCampListById,
  updateBootCampById,
  deleteBootCampById,
  uploadBootCampPhoto,
} = require("../controllers/bootCamps");

// Include other resource routers
const courseRouter = require("./courses");

// Re-route into other resource routers
router.use("/:bootCampId/courses", courseRouter);

// Traditional Way of calling
// router.get("/", getBootCampList);
// router.get("/:id", getBootCampListById);
// router.post("/", addBootCamp);
// router.put("/:id", updateBootCampById);
// router.delete("/:id", deleteBootCampById);

// Cleaner way of calling

router.route("/").get(getBootCampList).post(addBootCamp);

router.route("/:id/photo").put(uploadBootCampPhoto);

router
  .route("/:id")
  .get(getBootCampListById)
  .put(updateBootCampById)
  .delete(deleteBootCampById);

module.exports = router;

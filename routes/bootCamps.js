const express = require("express");
const router = express.Router();

const {
  addBootCamp,
  getBootCampList,
  getBootCampListById,
  updateBootCampById,
  deleteBootCampById,
} = require("../controllers/bootCamps");

// Traditional Way of calling
// router.get("/", getBootCampList);
// router.get("/:id", getBootCampListById);
// router.post("/", addBootCamp);
// router.put("/:id", updateBootCampById);
// router.delete("/:id", deleteBootCampById);

// Cleaner way of calling

router.route("/").get(getBootCampList).post(addBootCamp);

router
  .route("/:id")
  .get(getBootCampListById)
  .put(updateBootCampById)
  .delete(deleteBootCampById);

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ success: true, message: "Show all BootCamps" });
});

router.get("/:id", (req, res) => {
  res
    .status(200)
    .send({ success: true, message: `Get BootCamp ${req.params.id}` });
});

router.post("/", (req, res) => {
  res.status(200).send({ success: true, message: "Created new BootCamp" });
});

router.put("/:id", (req, res) => {
  res
    .status(200)
    .send({ success: true, message: `Updated BootCamp ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res
    .status(200)
    .send({ success: true, message: `Deleted BootCamp ${req.params.id}` });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addParking,
  removeParking,
  verifyParking,
  updateParking,
  getAllParking,
} = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/parkings" , isAuthenticated , getAllParking)
router.post("/addParking", isAuthenticated, addParking);
router.delete("/removeParking/:id", isAuthenticated, removeParking);
router.post("/verifyParking", isAuthenticated, verifyParking);
router.post("/updateParking", isAuthenticated, updateParking);

module.exports = router;

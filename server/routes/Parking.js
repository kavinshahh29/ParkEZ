const express = require("express");
const router = express.Router();
const {
  addParking,
  removeParking,
  verifyParking,
  updateParking,
} = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/addParking", isAuthenticated, addParking);
router.post("/removeParking", isAuthenticated, removeParking);
router.post("/verifyParking", isAuthenticated, verifyParking);
router.post("/updateParking", isAuthenticated, updateParking);

module.exports = router;

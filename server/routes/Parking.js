const express = require("express");
const router = express.Router();
const {
  addParking,
  removeParking,
  verifyParking,
  updateParking,
  getAllParking,
  getParking, 
  getUserParkings 
} = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/parkings", getAllParking);
router.get("/parkings/:id", getParking);
router.post("/addParking", isAuthenticated, addParking);
router.delete("/removeParking/:id", isAuthenticated, removeParking);
router.post("/verifyParking", isAuthenticated, verifyParking);
router.post("/updateParking", isAuthenticated, updateParking);
router.get("/userParkings/:id", getUserParkings);

module.exports = router;

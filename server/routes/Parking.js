const express = require("express");
const router = express.Router();
const {
  addParking,
  removeParking,
  verifyParking,
  updateParking,
  getAllParking,
  getParking,
} = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/parkings"  , getAllParking)
router.get("/parkings/:id" , getParking) ;
router.post("/addParking", isAuthenticated, addParking);
router.delete("/removeParking/:id", isAuthenticated, removeParking);
router.post("/verifyParking", isAuthenticated, verifyParking);
router.post("/updateParking", isAuthenticated, updateParking);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  addBooking,
  updateExitTime,
  removeBooking,
} = require("../controllers/Booking");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/addBooking", isAuthenticated, addBooking);
router.post("/updateExitTime", isAuthenticated, updateExitTime);
router.post("/removeBooking", isAuthenticated, removeBooking);

module.exports = router;

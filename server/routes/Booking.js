const express = require("express");
const router = express.Router();
const {
  addBooking,
  updateExitTime,
  removeBooking,
} = require("../controllers/Booking");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/booking", isAuthenticated, addBooking);
router.put("/booking", isAuthenticated, updateExitTime);
router.post("/removeBooking", isAuthenticated, removeBooking);

module.exports = router;

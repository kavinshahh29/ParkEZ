const express = require("express");
const router = express.Router();
const {
  addBooking,
  updateExitTime,
  removeBooking,
  BookingHistory,
  parkingBookings,
} = require("../controllers/Booking");
const { isAuthenticated } = require("../middlewares/auth");
const Booking = require("../models/Booking");

router.post("/booking", isAuthenticated, addBooking);
router.put("/booking", isAuthenticated, updateExitTime);
//router.get("/bookings/:userId", isAuthenticated, BookingHistory);
router.get("/bookings/:userId", BookingHistory);
router.get("/parkingBookings/:parkingId", parkingBookings );

router.post("/removeBooking", isAuthenticated, removeBooking);
module.exports = router;

const express = require("express");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
const { createPayment } = require("../controllers/Payment");

// router.get("/parkings/:id", getParkingCharge);

// router.post("/create-payment", isAuthenticated, createPayment);
router.post("/create-payment", createPayment);

module.exports = router;

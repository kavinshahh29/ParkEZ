const express = require("express");
const router = express.Router();
const { addParking, removeParking } = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/addParking", isAuthenticated, addParking);
router.post("/removeParking", isAuthenticated, removeParking);

module.exports = router;

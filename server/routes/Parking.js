const express = require("express");
const router = express.Router();
const { addParking, removeParking, getAllParkings } = require("../controllers/Parking.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.post("/parking", isAuthenticated, addParking);
router.delete("/parking", isAuthenticated, removeParking);
router.get("/parkings" , getAllParkings );

module.exports = router;

const express = require("express");
const router = express.Router();
const { addParking, removeParking, getAllParkings } = require("../controllers/Parking");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/parking", isAuthenticated, addParking);
router.delete("/parking", isAuthenticated, removeParking);
router.get("/parkings" , getAllParkings );

module.exports = router;

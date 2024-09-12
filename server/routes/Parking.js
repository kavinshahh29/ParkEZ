const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const { addParking, removeParking, getAllParkings } = require("../controllers/Parking.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.post("/parking", isAuthenticated, addParking);
router.delete("/parking", isAuthenticated, removeParking);
router.get("/parkings" , isAuthenticated  , getAllParkings );
>>>>>>> 095aa68d10f17571970f7d0933d4cdc257d9c20d

module.exports = router;

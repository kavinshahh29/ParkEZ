const express = require("express");
const router = express.Router();
const { registerWithSocials, getUserdetails } = require("../controllers/User");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/register", registerWithSocials);
router.post("/check", isAuthenticated);
router.post("/getuser", isAuthenticated, getUserdetails);

module.exports = router;

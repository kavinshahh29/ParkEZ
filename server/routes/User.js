const express = require('express')
const router = express.Router() ;
const { registerWithSocials , getUserDetails} = require('../controllers/User')
const { isAuthenticated} = require("../middlewares/auth");



router.post('/register',registerWithSocials) ;
router.post('/check' , isAuthenticated);
router.get("/getuser/:uid", getUserDetails);


module.exports = router ; 
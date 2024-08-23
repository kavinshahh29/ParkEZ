const express = require('express')
const router = express.Router() ;
const { registerWithSocials} = require('../controllers/User')
const { isAuthenticated} = require("../middlewares/auth");



router.post('/register',registerWithSocials) ;
router.post('/check' , isAuthenticated);


module.exports = router ; 
const express = require('express')
const router = express.Router() ;
const { registerWithSocials} = require('../controllers/User')



router.post('/registerWithSocials',registerWithSocials) ;


module.exports = router ; 
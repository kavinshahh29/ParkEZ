const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid : String ,
    fullName : String ,
    email : String ,
    mobile : String ,
    photoURL : String ,
})


module.exports = mongoose.model('User' , userSchema) ;

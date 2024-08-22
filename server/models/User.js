const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName : String ,
    email : String ,
    mobile : String ,
    photoURL : String ,
})


module.exports = mongoose.model('User' , userSchema) ;

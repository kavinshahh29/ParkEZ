const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid : {
        type : String ,
        required : true ,
        unique : true,
    } ,
    fullName : String ,
    email : String ,
    mobile : String ,
    photoURL : String ,
})


module.exports = mongoose.model('User' , userSchema) ;

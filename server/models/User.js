const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    // _id : {
    //     // type : mongoose.Schema.Types.ObjectId ,
    //     default : ()=>{
    //         return new mongoose.Types.ObjectId();
    //     }
    // },
    uid : String ,
    fullName : String ,
    email : String ,
    mobile : String ,
    photoURL : String ,
})


module.exports = mongoose.model('User' , userSchema) ;

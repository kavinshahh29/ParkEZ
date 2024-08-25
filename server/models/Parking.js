const mongoose=require("mongoose");

const parkingSchema= new mongoose.Schema({
    
    address:String,
    location_type : String ,
    location_coordinates : {
        lat : Number ,
        log : Number
    },
    photo_URL:String,
    video_URL:String,
    owner_id:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    description:String ,
    isVerified : {
        type : Boolean ,
        default : false ,
    }
})

module.exports = mongoose.model('Parking' , parkingSchema) ;
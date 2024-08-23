// Parking Collection
// {
// "_id": "ObjectId",
// "address": "String",
// "location": {
// "type": "String" (e.g., "Point"),
// "coordinates": [ "Number", "Number" ]
// },
// "type": "String",
// "photos": [ "Array of Strings" ],
// "videos": [ "Array of Strings" ],
// "owner_id": "ObjectId" (referencing User),
// "description": "String"
// }


const mongoose=require("mongoose");

const parkingSchema= new mongoose.Schema({
    
    address:"String",
    location:{
       type:Object({type:String,coordinates:[Number,Number]}), 
       required:true       
    },
    photo_URL:"String",
    video_URL:"String",
    owner_id:{
        type:mongoose.Schema.ObjectId,
    ref:"User"
    },
    description:"String"
})

module.exports = mongoose.model('Parking' , parkingSchema) ;
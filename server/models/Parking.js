<<<<<<< HEAD
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

const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  parking_id: "String",
  address: "String",
  location: {
    type: Object({ type: String, coordinates: [Number, Number] }),
    required: true,
  },
  photo_URL: "String",
  video_URL: "String",
  owner_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: "String",
  is_available: {
    type: Boolean,
    default: true, // True means parking is available for bookings
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Parking", parkingSchema);
=======
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
>>>>>>> 095aa68d10f17571970f7d0933d4cdc257d9c20d

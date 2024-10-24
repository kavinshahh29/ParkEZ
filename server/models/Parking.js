const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  address: String,
  location_type: String,
  location_coordinates: {
    lat: Number,
    lng: Number,
  },
  photo_URL: String,
  video_URL: String,
  owner_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  description: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  parking_charge: Number,
});

module.exports = mongoose.model("Parking", parkingSchema);

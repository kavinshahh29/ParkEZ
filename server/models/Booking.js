/*
Booking Collection 
{
   _id:"ObjectId", // booking id
   "user_id":"ObjectId" (referncing user),
   "parking_id":"ObjectId (referncing Parking),
   "arrival_time":dateTime,
   "exit_time":dateTime,
   "status":[],// Success,Cancelled,Accepted,Failure
   "payment_status":



}




*/

const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  parking_id: {
    type: mongoose.Schema.ObjectId,
    ref: "Parking",
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
  exit_time: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Success", "Cancelled", "Accepted", "Available"],
    default: "Available",
  },
  payment_status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  removed: {
    type: Boolean,
    default: false, // False means the booking is active
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

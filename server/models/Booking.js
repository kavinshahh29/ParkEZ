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
  vehicle_details: {
    type: {
      vehicle_no: {
        type: String,
        required: true,
      },
      vehicle_type: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

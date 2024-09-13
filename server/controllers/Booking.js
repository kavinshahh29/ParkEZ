const mongoose = require("mongoose");
const Booking = require("../models/Booking.js");

exports.addBooking = async (req, res) => {
  try {
    const { user_id, parking_id, arrival_time, exit_time } = req.body;

    let overlappingBookings = await Booking.find({
      parking_id,
      $or: [
        { arrival_time: { $lt: exit_time }, exit_time: { $gt: arrival_time } }
      ]
    });

    overlappingBookings.map((overlappingBooking)=>{
      if (overlappingBooking) {
        return res.status(400).json({
          success: false,
          message: "Booking slot not available at this time"
        });
      }
    })

   


    booking = new Booking({
      user_id,
      parking_id,
      arrival_time,
      exit_time,
      status: "Success",
      payment_status: "Pending",
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      message: "Booked slot successfully",
      data: booking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateExitTime = async (req, res) => {
  try {
    const { _id, newTime } = req.body;

    let booking = await Booking.findById(_id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking does not exist",
      });
    }

    booking.exit_time = newTime;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Exit time updated successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

exports.removeBooking = async (req, res) => {
  try {
    const { _id } = req.body;

    let booking = await Booking.findById(_id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking does not exist",
      });
    }

    booking.removed = true;
    await booking.save();

    return res.status(200).json({
      success: true,
      message: "Booking removed successfully",
      data: booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

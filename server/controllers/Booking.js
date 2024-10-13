const mongoose = require("mongoose");
const Booking = require("../models/Booking.js");

exports.addBooking = async (req, res) => {
  try {
    const { user_id, parking_id, arrival_time, exit_time , vehicle_number , vehicle_type } = req.body;

    let overlappingBookings = await Booking.find({
      parking_id,
      $or: [
        { arrival_time: { $lt: exit_time }, exit_time: { $gt: arrival_time } },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Booking slot not available at this time",
      });
    }

    
    console.log(user_id, parking_id, arrival_time, exit_time, vehicle_number , vehicle_type);

    booking = new Booking({
      user_id,
      parking_id,
      arrival_time,
      exit_time,
      status: "Requested",
      payment_status: "Pending",
      vehicle_details: {
        vehicle_number,
        vehicle_type,
      },
    });

    await booking.save();

    return res.status(201).json({
      success: true,
      message: "Booked slot successfully",
      data: booking,
    });
  } catch (err) {
    console.log(err);
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

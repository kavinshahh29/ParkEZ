const Booking = require("../models/Booking.js");
const User = require("../models/User.js");
const mongoose = require("mongoose");
const Parking = require("../models/Parking.js");

exports.addBooking = async (req, res) => {
  try {
    const {
      user_id,
      parking_id,
      arrival_time,
      exit_time,
      vehicle_number,
      vehicle_type,
    } = req.body;

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

    // console.log(
    //   user_id,
    //   parking_id,
    //   arrival_time,
    //   exit_time,
    //   vehicle_number,
    //   vehicle_type
    // );

    const finalUser = await User.findOne({ uid: user_id });

    booking = new Booking({
      user_id: finalUser._id,
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
exports.BookingHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("Fetching bookings for userId:", userId);

    let user = await User.findOne({ uid: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(user._id);

    const bookings = await Booking.find({ user_id: userObjectId }).populate(
      "parking_id"
    );

    // console.log(bookings);

    if (!bookings || bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching booking history:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
};


exports.getOwnerBookings = async (req, res) => {
  try {
    const owner_user_id = req.params.id;
    const owner = await User.findOne({ uid: owner_user_id });

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    const owner_id = owner._id;

    const owner_parkings = await Parking.find({ owner_id });

    const owner_parking_ids = owner_parkings.map((parking) => parking._id);

    const bookings = await Booking.find({
      parking_id: { $in: owner_parking_ids },
    }).populate("user_id");

    return res.status(200).json({
      success: true,
      bookings: bookings,
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


exports.parkingBookings = async (req, res) => {
  try {
    const parkingId = req.params.parkingId;


    const parking = await Parking.findById(parkingId);
    const bookings = await Booking.find({ parking_id: parkingId }).populate(
      "user_id"
    );

    return res.status(200).json({
      success: true,
      bookings: bookings,
      parking: parking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}



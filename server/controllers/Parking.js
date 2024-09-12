const { default: mongoose } = require("mongoose");
const Parking = require("../models/Parking.js");

exports.addParking = async (req, res) => {
  try {
    const {
      address,
      location_type,
      location_coordinates,
      photo_URL,
      video_URL,
      owner_id,
      description,
    } = req.body;

    let parking = await Parking.findOne({ location_coordinates });

    // console.log(parking);

    if (parking) {
      return res
        .json({ sucess: true, message: "Parking already exists" })
        .status(200);
    }

    // const _id = new  mongoose.

    parking = await Parking.create({
      address,
      location_type,
      location_coordinates,
      photo_URL,
      video_URL,
      owner_id: user._id,
      description,
    });

    await parking.save();

    return res.status(201).json({
      success: true,
      message: "Parking added successfully",
      data: parking,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.removeParking = async (req, res) => {
  try {
    const { location_coordinates } = req.body;

    let parking = await Parking.findOne({ _id });

    if (!parking) {
      return res
        .json({ sucess: true, message: "Parking not exist!" })
        .status(200);
    }

    // const _id = new  mongoose.

    parking = await Parking.deleteOne(_id);

    await parking.save();

    res.status(200).json({
      sucess: true,
      message: "Parking saved successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

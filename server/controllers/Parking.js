const { default: mongoose } = require("mongoose");
const Parking = require("../models/Parking.js");

exports.addParking = async (req, res) => {
  try {
    const { address, location, photo_URL, video_URL, owner_id, description } =
      req.body;

    let parking = await Parking.findOne({ location });

    if (parking) {
      return res
        .json({ sucess: true, message: "Parking already exists" })
        .status(200);
    }

    // const _id = new  mongoose.

    parking = await Parking.create({
      address,
      location,
      photo_URL,
      video_URL,
      owner_id,
      description,
    });

    await parking.save();

    res.status(200).json({
      sucess: true,
      message: "Parking saved successfully",
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

exports.removeParking = async (req, res) => {
  try {
    const { _id } = req.body;

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
    res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

const Parking = require("../models/Parking.js");

exports.addParking = async (req, res) => {
  try {
    const { address, location, photo_URL, video_URL, owner_id, description } =
      req.body;

    let parking = await Parking.findOne({ location });

    if (parking) {
      return res.status(409).json({
        success: false,
        message: "Parking already exists",
      });
    }

    parking = await Parking.create({
      address,
      location,
      photo_URL,
      video_URL,
      owner_id,
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
    const { _id } = req.body;

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.is_available = false;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking is now unavailable",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.verifyParking = async (req, res) => {
  try {
    const { _id } = req.body;

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.is_verified = true;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking verified successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateParking = async (req, res) => {
  try {
    const { _id, newlocation, newaddress } = req.body;

    let parking = await Parking.findById(_id);

    if (!parking) {
      return res.status(404).json({
        success: false,
        message: "Parking does not exist!",
      });
    }

    parking.address = newaddress || parking.address;
    parking.location = newlocation || parking.location;
    await parking.save();

    return res.status(200).json({
      success: true,
      message: "Parking updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const Parking = require("../models/parking.js");


exports.getAllParkings = async (req, res) => {
  try{
      const parkings = await Parking.find().populate("owner_id");
      // console.log(parkings)

      if(!parkings.length){
        return res.json({
          message : "No parkings currently present."
        }).status(204);
      }

      return res.json({
        parkings
      }).status(200);
  }
  catch(err){

    return res.json({
      message : err
    }).status(500);

  }
}


exports.addParking = async (req, res) => {
  try {
    const { address, location_type , location_coordinates , photo_URL, video_URL, owner_id, description } =
      req.body;

    let parking = await Parking.findOne({ location_coordinates });

    // console.log(parking);

    if (parking) {
      return res.status(400)
        .json({ sucess: false, message: "Parking already exists" })
        
    }

    // const _id = new  mongoose.

    parking = await Parking.create({
      address,
      location_type,
      location_coordinates ,
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
    const { location_coordinates } = req.body;

    let parking = await Parking.findOne({ location_coordinates });

    if (!parking) {
      return res
        .json({ sucess: true, message: "Parking not exist!" })
        .status(200);
    }

    // const _id = new  mongoose.

    await Parking.deleteOne({location_coordinates});
    res.status(200).json({
      sucess: true,
      message: "Parking deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

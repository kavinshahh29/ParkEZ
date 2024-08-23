const { default: mongoose } = require("mongoose");
const User = require("../models/user");

exports.registerWithSocials = async (req, res) => {
  try {
    const { uid, displayName, email, photoURL } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .json({ sucess: true, message: "user already exists" })
        .status(200);
    }

    user = await User.create({
      uid: uid,
      fullName: displayName,
      email,
      photoURL,
    });

    await user.save();

    res.status(200).json({
      sucess: true,
      message: "user saved successfully",
    });
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: err.message,
    });
  }
};

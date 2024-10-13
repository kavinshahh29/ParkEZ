const User = require("../models/User");

exports.registerWithSocials = async (req, res) => {
  try {
    const { uid, displayName, email, photoURL } = req.body;
    // console.log(req.body);

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

exports.getUserDetails = async (req,res) =>{
  try{
    const uid = req.paramas.uid;
    let user = await User.findOne({uid});

    if(!user){
      return res.status(404).json({
        success:false,
        message : "User not found"
      })
    }

    return res.status(200).json({
      success:true,
      user : user
    });
  }
  catch(err){
    return res.status(500).json({
      success:false ,
      message : err.message
    })
  }
}

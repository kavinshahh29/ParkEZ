const User = require("../models/user");

exports.registerWithSocials = async (req,res)=>{

    try{
        const { displayName , email , photoURL } = req.body ;

        let user = await User.findOne({email}) ;

        if(user) { return res.json({sucess:false , message:"user already exists"}).status(400)};

        user = await User.create({
            fullName : displayName ,
            email ,
            photoURL
        })

        await user.save();

        res.status(200).json({
            sucess : true ,
            message : "user saved successfully"
        })


    }
    catch(err){
        res.status(400).json({
            sucess : false ,
            message : err.message 
        })
    }

}
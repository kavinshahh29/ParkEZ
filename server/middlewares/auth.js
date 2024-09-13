const User = require("../models/user")
const { initializeApp  } = require("firebase-admin/app")
const { getAuth} = require("firebase-admin/auth");

const firebaseConfig = {
  apiKey: "AIzaSyC0eTAc6541kgTOrPbUR6ERLQ5peEwRZRY",
  authDomain: "parkez-c4e09.firebaseapp.com",
  projectId: "parkez-c4e09",
  storageBucket: "parkez-c4e09.appspot.com",
  messagingSenderId: "513907481335",
  appId: "1:513907481335:web:5b469d6abc18f27d9c91f2",
  measurementId: "G-3VPSD10LLK"
};

// Initialize Firebase
initializeApp(firebaseConfig);




exports.isAuthenticated = async (req,res,next)=>{
    try{       
        const idToken = req.cookies?.jwtToken || req.headers.authorization.split(" ")[1] ;
        const decodedToken = await getAuth().verifyIdToken(idToken)
        // console.log(decodedToken);
        // return res.json({
        //     user : decodedToken ,
        //     success : true
        // }).status(200);
        if(decodedToken)
            next();
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success : false ,
            error : "User not authenticated"

        })
    }
}

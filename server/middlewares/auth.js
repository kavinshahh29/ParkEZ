const { initializeApp  } = require("firebase-admin/app")
const { getAuth} = require("firebase-admin/auth");

const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
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


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";


import {getAuth} from 'firebase/auth';



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
// const analytics = getAnalytics(app);

const auth = getAuth();


export  {auth};
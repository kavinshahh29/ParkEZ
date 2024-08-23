import { GoogleAuthProvider , RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, signInWithRedirect } from "firebase/auth";
import  {auth}  from "../firebase/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TwitterAuthProvider } from "firebase/auth";
// import axios from "axios"



export const useLogin = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();

    const twitterProvider = new TwitterAuthProvider();
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);
    const [googleUser , setGoogleUser] = useState<any>(null);
    const [ showOTP , setShowOTP] = useState(false);
    const [phoneNumber , setPhoneNumber] = useState("");
    const [otp , setOTP] = useState("");


    const twitterLogin = async () => {  
        setLoading(true);

        console.log('twitter login');

        try{
            const res= await signInWithPopup(auth ,twitterProvider);
            if(!res){
                throw new Error('Twitter Sign in failed');
            }

            const user = res.user;
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };

            setGoogleUser(res.user);
            console.log(userData);

            setLoading(false);

            dispatch({
                type:"SET_USER",
                payload: userData
            })

           
            navigate('/');
        }
        catch(err : any){
            setError(err.message);
            setLoading(false);
        }
    }

    const googleLogin = async () => {
        setLoading(true);

        console.log('login');

        try{
            const res= await signInWithPopup(auth ,provider);
            // const res = await signInWithRedirect(auth, provider);
            if(!res){
                throw new Error('Google Sign in failed');
            }
            const user = res.user ;
            const userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            };

            setGoogleUser(res.user);
            console.log(userData);

            setLoading(false);

            dispatch({
                type:"SET_USER",
                payload: userData
            })

            

            navigate('/');
            

        }catch(err : any){
            setError(err.message);
            setLoading(false);

        }
    }

    const onCaptchaVerify = ( e : any) => {
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': () => {
                  // reCAPTCHA solved, allow signInWithPhoneNumber.
                  // ...
                  onPhoneSignUp(e);
                  console.log('captcha verified inside callback');
            
                },
                'expired-callback': () => {
                  // Response expired. Ask user to solve reCAPTCHA again.
                  // ...
                  console.log('reCAPTCHA expired, retry');
                }
              });
        }

    }

    const onPhoneSignUp = async ( e: any) => {
        e.preventDefault();
    
        setLoading(true);
        console.log('phone sign up' , phoneNumber);
        // onCaptchaVerify(e);
        
        if (!window.recaptchaVerifier) {
            onCaptchaVerify(e);
            console.log("captcha verified");
        }

        if( !window.recaptchaVerifier){
            setError('Captcha not verified');
            console.log('captcha not verified');
            return;
        }


        const appVerifier = window.recaptchaVerifier; 

        try{
            const confirmationResult  = await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            window.confirmationResult = confirmationResult;
            setShowOTP(true);
            console.log('OTP sent');

        }
        catch(err : any){
            setError(err.message);
            setLoading(false);
            console.log(err.message);
        }
        finally{
            setLoading(false);
        }

        console.log(showOTP);
        
        


    }

    const onOTPSubmit = () => {
        setLoading(true);
        const code = otp;
        (window as any).confirmationResult.confirm(code)
        .then ((result : any) => {

            const user = result.user;
            console.log(user);


        })
        .catch ((error : any) => {
            setError(error.message);
            setLoading(false);
        })
       
    }
    


    return {
        googleLogin,
        twitterLogin,
        error,
        loading,
        googleUser,
        setGoogleUser,
        showOTP,
        setShowOTP,
        phoneNumber,
        setPhoneNumber,
        onPhoneSignUp,
        onOTPSubmit ,
        setOTP

    }
}

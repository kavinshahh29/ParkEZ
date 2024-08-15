import { GoogleAuthProvider , signInWithPopup } from "firebase/auth";
import  {auth}  from "../firebase/config";
import { useState } from "react";
import { useDispatch } from "react-redux";



export const useLogin = () => {
    
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const [error , setError] = useState("");
    const [loading , setLoading] = useState(false);
    const [googleUser , setGoogleUser] = useState<any>(null);

    const googleLogin = async () => {
        setLoading(true);

        console.log('login');

        try{
            const res= await signInWithPopup(auth ,provider);
            if(!res){
                throw new Error('Google Sign in failed');
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

        }catch(err : any){
            setError(err.message);
            setLoading(false);

        }
    }


    return {
        googleLogin,
        error,
        loading,
        googleUser,
        setGoogleUser
    }
}

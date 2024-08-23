
import { useLogin } from "../hooks/useLogin";

import { AuthTabs } from "../components/Auth/AuthTabs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {toast} from 'react-hot-toast'

export default function Login() {
  const { googleLogin , twitterLogin } = useLogin();

  const navigate = useNavigate();
  const { user} = useSelector((state: any) => state.user);


  useEffect(()=>{
    // console.log(user)

    if(user){
      navigate("/");
    }
    

  },[user])

  return (
    <div>
      {/* <h1>Hello how are you {user?.email} </h1> */}
      <AuthTabs googleLogin={googleLogin} twitterLogin={twitterLogin} />
    </div>
  );
}

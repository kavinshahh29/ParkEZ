import  { useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { AuthTabs } from "../components/Auth/AuthTabs";
import { useDispatch,  } from "react-redux";

export default function Login() {
  const { googleLogin, setGoogleUser } = useLogin();
  const dispatch = useDispatch();

//   const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (googleUser) => {
      if (googleUser) {
        console.log("Inside Unscribe");
        // console.log(user);
        setGoogleUser(googleUser);

        const user = googleUser;
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch({
          type: "SET_USER",
          payload: userData,
        });

        // console.log(userData);
      }
    //   console.log(user);
    });

    return unscribe;
  }, []);


  return (
    <div>
      {/* <h1>Hello how are you {user?.email} </h1> */}
      <AuthTabs googleLogin={googleLogin} />


    </div>
  );
}

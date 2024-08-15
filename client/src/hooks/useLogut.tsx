import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";

export const useLogout = () => {

    const dispatch = useDispatch();

  const logout = async () => {
    try {
      await signOut(auth);
      dispatch({
          type: "CLEAR_USER",
        });
        console.log("user logged out")


    } catch (error : any) {
      console.log(error.message);
    }
  };

  return { logout };
};
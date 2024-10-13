import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import { Footer } from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import axios from "axios";
import MapExample from "./components/parking/Map"
import AddParking from "./components/parking/AddParking";
import NewsTicker from "./components/NewsTicker";
import ParkingDetails from "./pages/Parking/ParkingDetails";

function App() {
  const dispatch = useDispatch();

  const registerWithSocials = async (userData: any) => {
    console.log(userData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/register",
        userData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useSelector((state: any) => state.user);

  useEffect(() => {
    const unscribe = onAuthStateChanged(auth, (googleUser) => {
      if (googleUser) {
        console.log("Inside Unscribe");
        // console.log(user);
        // setGoogleUser(googleUser);

        const tempUser = googleUser;
        const userData = {
          uid: tempUser.uid,
          email: tempUser.email,
          displayName: tempUser.displayName,
          photoURL: tempUser.photoURL,
        };
        dispatch({
          type: "SET_USER",
          payload: userData,
        });

        registerWithSocials(userData);

        console.log(user);

        auth.currentUser
          ?.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            console.log("user token, " , idToken);
            document.cookie = `jwtToken=${idToken}; path=/; max-age=3600; Secure; SameSite=Strict`;
          });

      }
    });

    return unscribe;
  }, []);

  let routes;
  if (user) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Login />} />
        <Route path="/parkings" element={<MapExample />} />
        <Route path="parkings/add" element={<AddParking/>} />
        <Route path="parkings/:id" element={<ParkingDetails/>} />
        <Route path="*" element={<Home/>} />

      </Routes>
    );
  }
  else{
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authentication" element={<Login />} />
        <Route path="*" element={<Login/>} />
      </Routes>
    )
  }

  return (
    <div className=" font-primary ">
      <Router>
        <NewsTicker/>
        <Navbar />

        {/* <Toaster/> */}
        <div className="flex min-h-screen flex-col items-center mt-10">
        {routes}

        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

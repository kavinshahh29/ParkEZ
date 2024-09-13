import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
// import CustomMarker from "./CustomMarker";
// import CustomPopup from "./CustomPopup";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import ShimmerButton from "../magicui/shimmer-button";
import { Cookie } from "lucide-react";
// import Map from "react-map-gl";

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

type TPakring = {
  _id: any;
  address: string;
  location_type: "Public" | "Residential" | "Commercial";
  location_coordinates: {
    lat: number;
    log: number;
  };
  photo_URL: string;
  video_URL: string;
  owner_id: any;
  description: string;
};

export default function MapExample() {
  const [viewport, setViewport] = useState({
    latitude: 22.995275,
    longitude: 72.662987,
    zoom: 13,
  });

  const [popupInfo, setPopupInfo] = useState<any>(null);

  const [parkings, setParking] = useState<TPakring[]>([]);

  const fetchParkings = async () => {
    let token = document.cookie.split("=")[1];
    try {
      const res = await axios.get("http://localhost:3000/api/v1/parkings" , {
       withCredentials: true,
       headers: {
          Authorization : `Bearer ${token}`,
        },

      });
      setParking(res.data.parkings);
    } catch (err) {
      console.log(err);
    }
  };

  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/authentication");
    }

    fetchParkings();
  }, []);

  return (
    <div className="min-h-screen  z-50 ">
      <h1 className="text-3xl text-center ">
        Select the Parking Place you want to Book
      </h1>

      <Link to="/parking/add">
        <ShimmerButton className="shadow-2xl mx-auto my-3">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Add Parking
          </span>
        </ShimmerButton>
      </Link>

      <ReactMapGL
        {...viewport}
        mapboxAccessToken={TOKEN}
        style={{ width: 1400, height: 600 }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onMove={(evt) => {
          setViewport(evt.viewState);
        }}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
{/* 
        {parkings.map((parking) => {
          // {console.log(parking.owner_id?.fullName)}
          return (
            <CustomMarker
              parking={parking}
              setPopupInfo={setPopupInfo}
              zoom={viewport.zoom}
            />
          );
        })} */}

        {/* {popupInfo && (
          <CustomPopup
            latitude={popupInfo.location_coordinates["lat"]}
            longitude={popupInfo.location_coordinates["log"]}
            setPopupInfo={setPopupInfo}
            popupInfo={popupInfo}
          />
        )} */}
      </ReactMapGL>
    </div>
  );
}

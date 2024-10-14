import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ShimmerButton from "../magicui/shimmer-button";
import CustomMarker from "./CustomMarker";
import CustomPopup from "./CustomPopup";
import useApi from "../../hooks/useApi";
import SearchForm from "./SearchForm";

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;

type TPakring = {
  _id: any;
  address: string;
  location_type: "Public" | "Residential" | "Commercial";
  location_coordinates: {
    lat: number;
    lng: number;
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
  const { loading, get } = useApi();
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchParkings = async () => {
    try {
      const parkings = await get("https://parkez.onrender.com/api/v1/parkings");
      setParking(parkings.parkings);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlaceSelect = ({ latitude, longitude }: any) => {
    setViewport({ ...viewport, latitude, longitude, zoom: 14 });
  };

  useEffect(() => {
    if (!user) {
      navigate("/authentication");
    }

    fetchParkings();

    // Extract lat and lng from query params if they exist
    const params = new URLSearchParams(location.search);
    const lat = parseFloat(params.get("lat") || "");
    const lng = parseFloat(params.get("lng") || "");

    if (!isNaN(lat) && !isNaN(lng)) {
      setViewport({ ...viewport, latitude: lat, longitude: lng, zoom: 14 });
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen z-50 relative">
      <h1 className="text-3xl text-center my-6">
        Select the Parking Place you want to Book
      </h1>

      <SearchForm onPlaceSelect={handlePlaceSelect} />

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

        {parkings?.map((parking) => (
          <CustomMarker
            key={parking._id}
            parking={parking}
            setPopupInfo={setPopupInfo}
            zoom={viewport.zoom}
          />
        ))}

        {popupInfo && (
          <CustomPopup
            latitude={popupInfo.location_coordinates.lat}
            longitude={popupInfo.location_coordinates.lng}
            setPopupInfo={setPopupInfo}
            popupInfo={popupInfo}
          />
        )}
      </ReactMapGL>

      <Link to="/parkings/add">
        <ShimmerButton className="shadow-2xl mx-auto my-10">
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Want to add your parking space? Click here
          </span>
        </ShimmerButton>
      </Link>
    </div>
  );
}

import { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchForm from "./SearchForm";
import toast from "react-hot-toast";
import Home from "../../pages/Home";
import { useNavigate } from "react-router-dom";
// import CustomMarker from "./CustomMarker";

type TPakring = {
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
  parking_charge: number;
};

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;
export default function AddParking() {
  const navigate = useNavigate();
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [viewport, setViewport] = useState({
    latitude: 22.995275,
    longitude: 72.662987,
    zoom: 13,
  });

  const [parkingForm, setParkingForm] = useState<TPakring>({
    address: "",
    location_type: "Public",
    location_coordinates: {
      lat: 0,
      lng: 0,
    },
    photo_URL:
      "https://i.pinimg.com/550x/4f/28/db/4f28dbc52164e7b92872241d9dd808bb.jpg",
    video_URL: "/default.mp3",
    owner_id: "",
    description: "",
    parking_charge: 0,
  });

  const handleFormChange = (e: any) => {
    const { name, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      setParkingForm({ ...parkingForm, photo_URL: URL.createObjectURL(file) });
    } else {
      setParkingForm({
        ...parkingForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  const { user } = useSelector((state: any) => state.user);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    console.log(parkingForm);
    console.log(user);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwtToken="))
        ?.split("=")[1];
      // console.log(token);
      const response = await axios.post(
        "http://localhost:3000/api/v1/addParking",
        {
          address: parkingForm.address,
          location_coordinates: parkingForm.location_coordinates,
          photo_URL: parkingForm.photo_URL,
          video_URL: parkingForm.video_URL,
          owner_id: user.uid,
          description: parkingForm.description,
          parking_charge: parkingForm.parking_charge,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        // alert("Parking added successfully!");
        toast.success("Parking added successfully!");
        console.log(response.data);

        navigate("/home");
      }
    } catch (error) {
      console.error("Error adding parking:", error);
      toast.error("Failed to add parking.");
      // alert("Failed to add parking.");
    }
  };

  const handlePlaceSelect = ({ latitude, longitude }: any) => {
    setViewport({ ...viewport, latitude, longitude, zoom: 14 });
  };

  return (
    <div className="min-h-screen  z-50 ">
      <h1 className="text-3xl text-center m-3">Add New Parking</h1>

      <SearchForm onPlaceSelect={handlePlaceSelect} />
      <MapComponent
        viewport={viewport}
        setViewport={setViewport}
        setParkingForm={setParkingForm}
        parkingForm={parkingForm}
        markerPosition={markerPosition}
        setMarkerPosition={setMarkerPosition}
      />

      <form
        className="flex flex-col justify-center w-[600px] m-auto mt-10 bg-black p-6 border border-gray-500 rounded-md"
        onSubmit={handleFormSubmit}
      >
        <div>
          <Label htmlFor="address">Address</Label>
          {/* <Input value={parkingForm?.address} name="address" onChange={handleFormChange}></Input> */}
          <Input
            value={parkingForm?.address}
            name="address"
            onChange={handleFormChange}
          ></Input>
        </div>

        <div>
          <Label>Location Type</Label>
          <select
            name="location_type"
            id="location_type"
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white "
            value={parkingForm?.location_type}
            onChange={handleFormChange}
          >
            <option value="Public">Public</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            value={parkingForm?.description}
            name="description"
            onChange={handleFormChange}
          ></Input>
        </div>

        <div>
          <Label htmlFor="payment_charge">Payment Charge</Label>
          <Input
            value={parkingForm?.parking_charge}
            name="parking_charge"
            onChange={handleFormChange}
          ></Input>
        </div>

        {/* <div>
          <label htmlFor="Photo">Photo</label>
          <input
            type="file"
            name="photo_URL"
            accept="image/*"
            onChange={handleFormChange}
          />
        </div> */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit Parking
        </button>
      </form>
    </div>
  );
}

function MapComponent({
  viewport,
  setViewport,
  setParkingForm,
  parkingForm,
  setMarkerPosition,
  markerPosition,
}: {
  viewport: any;
  setViewport: any;
  setParkingForm: any;
  parkingForm: any;
  setMarkerPosition: any;
  markerPosition: any;
}) {
  return (
    <div className="h-full">
      <ReactMapGL
        {...viewport}
        mapboxAccessToken={TOKEN}
        style={{ width: 1400, height: 600 }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onMove={(evt) => {
          setViewport(evt.viewState);
        }}
        onClick={(e) => {
          const lat = e.lngLat.lat;
          const lng = e.lngLat.lng;

          setMarkerPosition({ lat, lng });

          setParkingForm({
            ...parkingForm,
            location_coordinates: {
              lat,
              lng,
            },
          });
          console.log(parkingForm);
        }}
      >
        {markerPosition && (
          <Marker latitude={markerPosition.lat} longitude={markerPosition.lng}>
            {/* <div
              style={{
                backgroundColor: "red",
                height: "10px",
                width: "10px",
                borderRadius: "50%",
              }}
            /> */}
          </Marker>
        )}
        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />
      </ReactMapGL>
    </div>
  );
}

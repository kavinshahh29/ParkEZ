import { useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useSelector } from "react-redux";
// import CustomMarker from "./CustomMarker";

type TPakring = {
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

const TOKEN = import.meta.env.VITE_MAPBOX_KEY;
export default function AddParking() {
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
      log: 0,
    },
    photo_URL: "",
    video_URL: "",
    owner_id: "",
    description: "",
  });

  const handleFormChange = (e: any) => {
    const { name, value, files } = e.target;
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
      let token = document.cookie.split("=")[1];
      const response = await axios.post(
        "http://localhost:5000/api/v1/addParking", // i have added here statically portno now made change as per  .env
        {
          address: parkingForm.address,
          location_coordinates: parkingForm.location_coordinates,
          photo_URL: parkingForm.photo_URL,
          video_URL: parkingForm.video_URL,
          owner_id: user.uid, //  add correct owner id
          description: parkingForm.description,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkNzU2OWQyODJkNWM1Mzk5MmNiYWZjZWI2NjBlYmQ0Y2E1OTMxM2EiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2F2aW4gU2hhaCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMQUl1NzZkUWhXU2pvSWg4RlJORlhpZGg5Zi0yNUlaTEQyUTZVV1pKZ2FlOVZET1E9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFya2V6LWM0ZTA5IiwiYXVkIjoicGFya2V6LWM0ZTA5IiwiYXV0aF90aW1lIjoxNzI4MDQxNjI2LCJ1c2VyX2lkIjoic1IyTHRaRzg0bmV1WjhRckZWamhrOEZYZG85MiIsInN1YiI6InNSMkx0Wkc4NG5ldVo4UXJGVmpoazhGWGRvOTIiLCJpYXQiOjE3MjgwNDE2MzAsImV4cCI6MTcyODA0NTIzMCwiZW1haWwiOiJrYXZpbnNoYWgyOTAzMDRAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDQyNTM1NDA5NzgzODcxMTM4MTciXSwiZW1haWwiOlsia2F2aW5zaGFoMjkwMzA0QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.uTmoEoI_Un1CpSVQ1pwDFqbOe7shXwySBjSzVGakxr-W19fxXN2tn1HrH08EB7sFAMZnRlmDRoOm60FurlDUVQKLysbFkqFS17j1Oq7omq2z89B_Hj2KXn1H71jzo9iJqAvZ-leT1m3kn2ptfa3bNUmYjmAVbEea_05HAAeGEDlxQClxHOfF_wiHap2w6cVTwJnoYcThIVYL51g3panpoyoSvIBfxYJd_ry3n8iQVqtscIysiMAgbIkU6qIUo5BrH8kOdK7ijpghvieKeIpTTi2ch6MBMPioVm1P8CkeHFsnPao1JYSt8UKcZKBY86a9ymrHbpmMtiAymC2N3gKcZw`,
          },
        }
      );

      if (response.status === 200) {
        alert("Parking added successfully!");
        console.log(response.data);
      }
    } catch (error) {
      // console.error("Error adding parking:", error);
      alert("Failed to add parking.");
    }
  };

  return (
    <div className="min-h-screen  z-50 ">
      <h1 className="text-3xl text-center m-3">Add New Parking</h1>

      <MapComponent
        viewport={viewport}
        setViewport={setViewport}
        setParkingForm={setParkingForm}
        parkingForm={parkingForm}
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
          <label htmlFor="Photo">Photo</label>
          <input
            type="file"
            name="photo_URL"
            accept="image/*"
            onChange={handleFormChange}
          />
        </div>
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
}: {
  viewport: any;
  setViewport: any;
  setParkingForm: any;
  parkingForm: any;
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
          setParkingForm({
            ...parkingForm,
            location_coordinates: {
              lat: e.lngLat["lat"],
              log: e.lngLat["lng"],
            },
          });
          console.log(parkingForm);
        }}
      >
        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />
      </ReactMapGL>
    </div>
  );
}

import {  useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";



import { Input } from "../ui/input";
import { Label } from "../ui/label";
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



    
  const [parkingForm , setParkingForm] = useState<TPakring>(
    {
        address : "",
        location_type : "Public",
        location_coordinates : {
          lat : 0,
          log : 0
        },
        photo_URL : "",
        video_URL : "",
        owner_id : "",
        description : ""
    }
  );  
  
  const handleFormChange = (e : any) => {
    

    setParkingForm({
      ...parkingForm,
      [e.target.name]: e.target.value 
    })
  }

  return (
    <div className="min-h-screen  z-50 ">
      <h1 className="text-3xl text-center m-3">Add New Parking</h1>

   
        <MapComponent viewport={viewport} setViewport={setViewport} setParkingForm={setParkingForm} parkingForm={parkingForm}/>
    



      

      <form className="flex flex-col justify-center w-[600px] m-auto mt-10 bg-black p-6 border border-gray-500 rounded-md">

        <div>
          <Label htmlFor="address">Address</Label>
          {/* <Input value={parkingForm?.address} name="address" onChange={handleFormChange}></Input> */}
          <Input value={parkingForm?.address} name="address" onChange={handleFormChange}></Input>
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
          <Input value={parkingForm?.description} name="description" onChange={handleFormChange}></Input>
        </div>


      </form>
    </div>
  );
}

function MapComponent({viewport , setViewport , setParkingForm , parkingForm} : {viewport : any , setViewport : any , setParkingForm : any , parkingForm : any}) {
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
        
        onClick={
          (e) => {
            setParkingForm({
              ...parkingForm,
              location_coordinates: {
                lat: e.lngLat['lat'],
                log: e.lngLat['lng']
              }
            })
            console.log(parkingForm);
          }
        }
      >
        <FullscreenControl />
        <GeolocateControl />
        <NavigationControl />
        <ScaleControl />


      </ReactMapGL>
    </div>
  );
}
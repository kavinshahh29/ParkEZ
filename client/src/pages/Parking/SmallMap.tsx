import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";

type SmallMapProps = {
  latitude: number;
  longitude: number;
};


const TOKEN = import.meta.env.VITE_MAPBOX_KEY;
const SmallMap: React.FC<SmallMapProps> = ({ latitude, longitude }) => {
  
  const [viewport, setViewport] = React.useState({
    latitude: latitude,
    longitude: longitude,
    zoom: 14, 
  });

  return (
    <ReactMapGL
      {...viewport}
      style={{ width: 400, height: 400 , borderRadius: 10}}
      mapboxAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onMove={(evt) => {
        setViewport(evt.viewState);
      }}
    >
      <Marker latitude={latitude} longitude={longitude} anchor="bottom">
        {/* <div className="bg-red-500 w-3 h-3 rounded-full" /> */}
      </Marker>
    </ReactMapGL>
  );
};

export default SmallMap;
import { Marker } from "react-map-gl";

export default function CustomMarker({ parking, setPopupInfo, zoom }: any) {
  
  // const size = Math.max(100, zoom * 2);
  console.log(zoom)

  return (
    <Marker
      longitude={parking.location_coordinates["lng"]}
      latitude={parking.location_coordinates["lat"]}
      anchor="bottom"
      onClick={() => setPopupInfo(parking)}
      
    >
      {/* <img
        src="/images/pointer.png" 
        alt="Parking Marker"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: "pointer",
          transform: `translate(-50%, -${size / 2}px)`,
        }}
      /> */}
    </Marker>
  );
}

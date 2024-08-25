import { Marker } from 'react-map-gl'

export default function CustomMarker( { parking ,  setPopupInfo  , zoom} : any) {
 

  return (
    <Marker latitude={parking.location_coordinates["lat"]} longitude={parking.location_coordinates["log"]}
    onClick={(e)=> {
      console.log("Clicked")
      e.originalEvent.stopPropagation();
      setPopupInfo(parking);
    }}
    
    >
        <div  style={{
          width: `${zoom*3}px`,
          height: `${zoom*3}px`,
          cursor: 'pointer',
        }} 
        // onMouseEnter={
        //   ()=>setPopupInfo(parking)
        // }
        // onMouseLeave={
        //   ()=>setPopupInfo(null)
        // }
        >
          <img src="/images/parking_marker.png" style={{ width: '100%', height: '100%' }} alt="Parking"/>
        </div>
    </Marker>
  )
}

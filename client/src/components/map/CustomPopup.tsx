import { Popup } from "react-map-gl"
import { Avatar, AvatarImage } from "../ui/avatar"

export default function CustomPopup( {latitude , longitude , setPopupInfo , popupInfo} : any) {
  return (
    <Popup
      anchor="bottom-right"
      latitude={latitude}
      longitude={longitude}
      onClose={()=> setPopupInfo(null)}
      className="pr-4"
      
    >
      <div className="w-full h-full
       text-black text-lg mr-10">

        <div>
          <h1>Owner Info :</h1>
        <Avatar className=" border-slate-500 border-2 md:mr-4 h-8 w-8" >
                    <AvatarImage src={popupInfo.owner_id?.photoURL} alt={popupInfo.owner_id?.displayName}   className=""/>
                   
        </Avatar>
          <p>Name : {popupInfo.owner_id.fullName}</p>
          {/* <p>Email : {popupInfo.owner_id.email}</p> */}

        </div>
       
        <p>Address : {popupInfo.address}</p>

      </div>

    </Popup>
  )
}

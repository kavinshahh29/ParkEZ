import { Popup } from "react-map-gl";
import { useNavigate } from "react-router-dom";

type CustomPopupProps = {
  latitude: number;
  longitude: number;
  setPopupInfo: (info: any) => void;
  popupInfo: {
    _id: any;
    address: string;
    location_type: "Public" | "Residential" | "Commercial";
    location_coordinates: {
      lat: number;
      lng: number;
    };
    photo_URL: string;
    description: string;
    owner_id: any;
    parking_charge: number;
  };
};

export default function CustomPopup({
  latitude,
  longitude,
  setPopupInfo,
  popupInfo,
}: CustomPopupProps) {
  const navigate = useNavigate();

  const handleClickMoreInfo = () => {
    navigate(`/parkings/${popupInfo._id}`);
  };
  return (
    <Popup
      latitude={latitude}
      longitude={longitude}
      onClose={() => setPopupInfo(null)}
      closeOnClick={false}
      // offsetTop={-10}
      offset={-10}
      maxWidth="500px"
      className="bg-[#111] shadow-lg rounded-lg p-4 z-50 "
      anchor="bottom-left"
    >
      <div className="flex flex-col bg-[#111] h-full font-primary">
        <h3 className="text-lg font-bold mb-2">{popupInfo.address}</h3>
        <p className="text-sm text-gray-400">{popupInfo.description}</p>
        <p className="text-sm font-medium mt-2">
          Type: {popupInfo.location_type}
        </p>
        {popupInfo.photo_URL && (
          <img
            src={popupInfo.photo_URL}
            alt="Parking"
            className="mt-3 w-60 h-40 object-cover rounded-md"
          />
        )}

        <div className="mt-3 flex  space-x-2 justify-left items-center">
          <img
            src={popupInfo.owner_id.photoURL}
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <p className="text-sm">
            <span className="text-gray-300">Owner Name :</span>{" "}
            {popupInfo.owner_id.fullName}
          </p>
          {/* <p className="text-sm">Name : {popupInfo.owner_id.email}</p> */}
        </div>

        <div className="mt-3 flex  space-x-2 justify-left items-center">
          <p className="text-sm">
            <span className="text-gray-300">Parking Charge :</span> ₹
            {popupInfo.parking_charge}
          </p>
          {/* <p className="text-sm">Name : {popupInfo.owner_id.email}</p> */}
        </div>

        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          onClick={handleClickMoreInfo}
        >
          More Info
        </button>
      </div>
    </Popup>
  );
}

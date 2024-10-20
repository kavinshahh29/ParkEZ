import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SmallMap from "./SmallMap";
import ParkingReservationForm from "../../components/parking/ParkingReservationForm";
// import ParkingReservationForm from "../../components/parking/BookParking";

type TPakringDetails = {
  _id: string;
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

export default function ParkingDetails() {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }
  const [parking, setParking] = useState<TPakringDetails | null>(null);

  useEffect(() => {
    const fetchParkingDetails = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("jwtToken="))
          ?.split("=")[1];

        const res = await axios.get(
          `http://localhost:3000/api/v1/parkings/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setParking(res.data.parking);
        console.log(parking);
      } catch (err) {
        console.log(err);
        navigate("/");
      }
    };

    fetchParkingDetails();
  }, [id, navigate]);

  if (!parking) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full py-10  px-10 border-2 rounded-lg shadow-md">
      <button
        onClick={() => navigate("/parkings")}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Go Back
      </button>

      <div className="max-w-4xl mx-autoshadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={parking?.photo_URL}
              alt="Parking"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 md:ml-6 mt-4 md:mt-0">
            <div className="bg-gray-50 rounded-md p-4 text-gray-800">
              <h1 className="text-2xl font-bold">{parking.address}</h1>
              <p className=" mt-2">{parking?.description}</p>
              <p className="mt-4">
                <span className="font-semibold">Type:</span>{" "}
                {parking?.location_type}
              </p>
            </div>

            <div className="flex items-center mt-6 space-x-6 border bg-gray-50 p-4 rounded-lg shadow-md">
              {parking.owner_id.photoURL && (
                <img
                  src={parking.owner_id.photoURL}
                  alt={parking.owner_id.fullName}
                  className="w-16 h-16 rounded-full shadow-sm"
                />
              )}
              <div>
                <p className="text-lg font-semibold text-gray-800">Owner</p>
                <p className="text-sm font-medium text-gray-600">
                  {parking.owner_id.fullName}
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">Email</p>
                <p className="text-sm font-medium text-gray-600">
                  {parking.owner_id.email}
                </p>
              </div>
            </div>

            {/* {parking.video_URL && (
              <div className="mt-4">
                <video controls className="w-full rounded-lg">
                  <source src={parking.video_URL} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )} */}
          </div>
        </div>
      </div>

      <div className="flex md:flex-row flex-col justify-center items-center md:space-y-0 md:space-x-10 space-x-0 space-y-4 mt-4">
        <div className="rounded-lg ">
          <SmallMap
            latitude={parking.location_coordinates.lat}
            longitude={parking.location_coordinates.lng}
            // destination={{ lat: 40.73061, lng: -73.935242 }}
          />
        </div>

        <ParkingReservationForm
          parkingId={id as string}
          userId={parking.owner_id}
        />
      </div>
    </div>
  );
}

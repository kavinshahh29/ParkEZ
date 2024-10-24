import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useApi from "../hooks/useApi";

export default function MyParkings() {
  const { user } = useSelector((state: any) => state.user);
  const [parkings, setParkings] = useState([]);

  const { get } = useApi();

  const getUserParkings = async () => {
    try {
      const res = await get(
        `http://localhost:3000/api/v1/userParkings/${user?.uid}`
      );

      setParkings(res.parkings);
      console.log(res.parkings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserParkings();
  }, []);

  console.log(user);
  return (
    <div>
      <h1 className="text-2xl text-center">{user?.displayName}'s Parkings</h1>
      

      <div className="flex justify-center items-center flex-col">
        
        {parkings?.map((parking: any) => (
            <div className="border-2 m-10 mt-20 flex  items-center justify-center rounded-2xl bg-gray-200 p-14 shadow-sm min-w-2xl max-w-2xl text-black space-x-10">

                <img src={parking.photo_URL} alt="" className="w-64 rounded-lg"/>
                
                <div>
                <h1 className="text-md text-center">{parking.address}</h1>
                
                <h2 className="text-md text-center">Parking Type: {parking.location_type}</h2>
                <h2 className="text-md text-center">Parking Charge: {parking.parking_charge}</h2>
                <h2 className="text-md text-center">Description : {parking.description}</h2>
               

                </div>
            </div>
            ))    
        
        }  
      
      </div>
    </div>
  );
}

import React, { useState } from "react";
import DateTimePicker from "../ui/DateTimePicker";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";
// import DateTimePicker from "react-datetime-picker"; 


type ParkingReservationFormProps = {
  parkingId: string;
  userId: any;
};

type ParkingBooking = {
  user_id: string;
  parking_id: string;
  arrival_time: any;
  exit_time: any;
  vehicle_number: string;
  vehicle_type: string;

};

const ParkingReservationForm: React.FC<ParkingReservationFormProps> = ({
  parkingId,
  userId,
}) => {
 
  const { loading , post } = useApi();

  const [bookingForm, setBookingForm] = useState<ParkingBooking>({
    user_id: userId._id,
    parking_id: parkingId,
    arrival_time: new Date(),
    exit_time: new Date(new Date().setDate(new Date().getDate() + 1)),
    vehicle_number: "",
    vehicle_type: "car",

  });

  const handleBooking = async () => {
   
    toast.promise(
      post("https://parkez.onrender.com/api/v1/booking", bookingForm),
      {
        loading: 'Booking in progress...',
        success: <b>Booking successful!</b>,
        error: <b>
            Falied to book parking slot. Parking slot might be already booked.
        </b>,
      }
    );
  };

  const onChange = (value: any, name: string) => {
    setBookingForm({
      ...bookingForm,
      [name]: value,
    });
  };

  return (
    <div className="p-6 rounded shadow-md w-full max-w-md bg-white text-gray-900 dark:bg-gray-50 dark:text-black">
      <h2 className="text-lg font-bold mb-4">Book Parking Slot</h2>

      <div className="mb-4">
       
        <DateTimePicker
          onChange={(value) => onChange(value, "arrival_time")}
          selectedDateTime={bookingForm.arrival_time}
          label="Arrival Time"
          
        />
      </div>

      <div className="mb-4">
       
        <DateTimePicker
          onChange={(value) => onChange(value, "exit_time")}
          selectedDateTime={bookingForm.exit_time}
          label="Exit Time"
          
        />
      </div>

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vehicle Number</label>
            <input
            type="text"
            className="border-gray-300 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter Vehicle Number"
            onChange={(e) => {onChange(e.target.value, "vehicle_number")
                // console.log(bookingForm.vehicle_number);
            }}
            />
        </div>

       

        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Vehicle Type</label>
            <select
                className="border-gray-300 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onChange={(e) => onChange(e.target.value, "vehicle_type")}
            >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="scooter">Scooter</option>
                <option value="truck">Truck</option>
            </select>
        </div>
      <button
        onClick={handleBooking}
        disabled={loading}
        className="py-2 px-4 rounded mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
      >
        {loading ? "Checking Avability & Booking..." : "Book Now"}
      </button>
    </div>
  );
};

export default ParkingReservationForm;

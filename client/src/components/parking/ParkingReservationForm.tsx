import React, { useState, useEffect } from "react";
import DateTimePicker from "../ui/DateTimePicker";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const TOKEN = import.meta.env.VITE_PUBLISHER_KEY;

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
  payment_status: string;
};

const ParkingReservationForm: React.FC<ParkingReservationFormProps> = ({
  parkingId,
  userId,
}) => {
  const { loading, post } = useApi();

  const [bookingForm, setBookingForm] = useState<ParkingBooking>({
    user_id: userId,
    parking_id: parkingId,
    arrival_time: new Date(),
    exit_time: new Date(new Date().setDate(new Date().getDate() + 1)),
    vehicle_number: "",
    vehicle_type: "car",
    payment_status: "Pending",
  });

  const [parkingCharge, setParkingCharge] = useState<number | null>(null);

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
    parking_charge: number;
  };

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
        setParkingCharge(res.data.parking.parking_charge);
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

  // Generic onChange handler
  const handleChange = (field: keyof ParkingBooking, value: any) => {
    setBookingForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleBookingAndPayment = async () => {
    console.log(bookingForm);
    try {
      const response = await post(
        "http://localhost:3000/api/v1/booking",
        bookingForm
      );

      if (response.success) {
        await handlePayment();
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error: unknown) {
      toast.error("An error occurred during booking. Please try again later.");
    }
  };

  const handlePayment = async () => {
    const publisherKey = TOKEN;
    if (!publisherKey) {
      console.error("Missing Stripe publishable key.");
      return;
    }

    const stripe = await loadStripe(publisherKey);
    if (!stripe) {
      console.error("Stripe initialization failed.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/create-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(parkingCharge),
          }),
        }
      );

      const session = await response.json();

      if (session && session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
        } else {
          setBookingForm((prevForm) => ({
            ...prevForm,
            payment_status: "Paid",
          }));

          toast.success("Payment successful! Your booking is complete.");
        }
      } else {
        console.error("No session ID received.");
      }
    } catch (error) {
      console.error("Error during payment process:", error);
    }
  };

  return (
    <div className="p-6 rounded shadow-md w-full max-w-md bg-white text-gray-900 dark:bg-gray-50 dark:text-black">
      <h2 className="text-lg font-bold mb-4">Book Parking Slot</h2>

      {parkingCharge !== null ? (
        <div className="mb-4">
          <p className="text-sm">
            Parking Charge: <strong>${parkingCharge}</strong>
          </p>
        </div>
      ) : (
        <p>Loading parking charge...</p>
      )}

      <div className="mb-4">
        <DateTimePicker
          onChange={(value) => handleChange("arrival_time", value)}
          selectedDateTime={bookingForm.arrival_time}
          label="Arrival Time"
        />
      </div>

      <div className="mb-4">
        <DateTimePicker
          onChange={(value) => handleChange("exit_time", value)}
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
          value={bookingForm.vehicle_number}
          onChange={(e) => handleChange("vehicle_number", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Vehicle Type</label>
        <select
          className="border-gray-300 border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={bookingForm.vehicle_type}
          onChange={(e) => handleChange("vehicle_type", e.target.value)}
        >
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="scooter">Scooter</option>
          <option value="truck">Truck</option>
        </select>
      </div>

      <button
        onClick={handleBookingAndPayment}
        disabled={loading}
        className="py-2 px-4 rounded mt-4 w-full bg-green-600 text-white hover:bg-green-700 transition dark:bg-green-500 dark:hover:bg-green-600"
      >
        {loading ? "Processing..." : "Book & Pay Now"}
      </button>
    </div>
  );
};

export default ParkingReservationForm;

import React, { useEffect, useState } from "react";
import axios from "axios";

const BookingHistory = ({ curuser }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (curuser && curuser.uid) {
      const fetchBookings = async () => {
        try {
          console.log("Fetching booking history for user:", curuser.uid);
          //const response = await axios.get(`/api/v1/bookings/${curuser.uid}`);
          const response = await axios.get(
            `http://localhost:3000/api/v1/bookings/${curuser.uid}`
          );

          if (response.data.length === 0) {
            setError("No bookings found for this user.");
            setLoading(false);
          } else {
            setBookings(response.data);
            setLoading(false);
          }
        } catch (err) {
          setError("An error occurred while fetching bookings.");
          setLoading(false);
        }
      };

      fetchBookings();
    } else {
      setError("User ID not available");
      setLoading(false);
    }
  }, [curuser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl mb-4 text-center">Booking History</h2>
      <table className="min-w-full dark:bg-black bg-gray-50 border shadow-md ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Parking Location</th>
            <th className="py-2 px-4 border-b">Arrival Time</th>
            <th className="py-2 px-4 border-b">Exit Time</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Vehicle Number</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="py-2 px-4 border-b">
                {booking.parking_id?.address || "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(booking.arrival_time).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">
                {new Date(booking.exit_time).toLocaleString()}
              </td>
              {/* <td className="py-2 px-4 border-b">{booking.status}</td> */}

              {booking.status == "Requested" ? (
                <td className="py-2 px-4 border-b text-red-500">Pending</td>
              ) : (
                <td className="py-2 px-4 border-b text-greed-500">
                  {booking.status}
                </td>
              )}
              {/* <td className="py-2 px-4 border-b">{booking.payment_status}</td> */}
              <td className="py-2 px-4 border-b">
                {booking.vehicle_details?.vehicle_number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;

import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useEffect, useState } from "react";


const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    };
    return new Date(dateString).toLocaleString(undefined, options);
};


const getParkingStatus = (arrival: string, exit: string) => {
    const currentTime = new Date();
    const arrivalTime = new Date(arrival);
    const exitTime = new Date(exit);

    if (exitTime < currentTime) {
        return "Completed";
    } else if (arrivalTime <= currentTime && exitTime >= currentTime) {
        return "Ongoing";
    } else {
        return "Upcoming";
    }
};

export default function ParkingBookings() {
    const parkingId = useParams<{ id: string }>().id;
    const [bookings, setBookings] = useState([]);
    const [parking , setParking] = useState<any>();

    const { get } = useApi();

    const getBookingOfParking = async () => {
        try {
            const res = await get(`http://localhost:3000/api/v1/parkingBookings/${parkingId}`);
            setBookings(res.bookings);
            setParking(res.parking);
            // console.log(res.bookings);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBookingOfParking();
    }, []);

    return (
        <div>
            <h1 className="text-2xl text-center mb-4">Booking History of Your Parking</h1>

            <h2 className="text-xl text-center mb-10">Parking Location: {parking?.address}</h2>

            <table className="min-w-full dark:bg-black bg-gray-50 border shadow-md">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Arrival Time</th>
                        <th className="py-2 px-4 border-b">Exit Time</th>
                        <th className="py-2 px-4 border-b">Vehicle Number</th>
                        <th className="py-2 px-4 border-b">User</th>
                        <th className="py-2 px-4 border-b">Status</th>
                    </tr>
                </thead>

                <tbody>
                    {bookings.map((booking: any) => (
                        <tr key={booking._id}>
                            <td className="py-2 px-4 border-b">{formatDate(booking?.arrival_time)}</td>
                            <td className="py-2 px-4 border-b">{formatDate(booking?.exit_time)}</td>
                            <td className="py-2 px-4 border-b">{booking?.vehicle_details?.vehicle_number}</td>
                            <td className="py-2 px-4 border-b flex items-center">
                                {booking?.user_id?.photo_URL && (
                                    <img 
                                        src={booking.user_id.photo_URL} 
                                        alt={booking.user_id.fullName} 
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                )}
                                {booking?.user_id?.fullName}
                            </td>
                            <td className="py-2 px-4 border-b">{getParkingStatus(booking?.arrival_time, booking?.exit_time)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

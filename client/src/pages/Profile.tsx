import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { useLogout } from "../hooks/useLogut";
import HyperText from "../components/ui/hyper-text";
export default function Profile() {
  const { user } = useSelector((state: any) => state.user);

  console.log(user);

  const { logout } = useLogout();

  return (
    <div>
      <div className="border-2 m-10 mt-20 flex flex-col items-center justify-center rounded-2xl p-14 shadow-lg shadow-gray-900">
        <HyperText text="Your Profile"></HyperText>
        <div className="flex items-center justify-center">
          <img
            src={user.photoURL}
            alt="{{user.username}}"
            className="h-50 w-50 rounded-xl"
          />

          <div className="m-10 flex space-x-4">
            <div className="flex flex-col space-y-3">
              <p className="text-gray-400">Email :</p>
              <p className="text-gray-400">Full Name :</p>

              {/* <p className="text-gray-400">Mobile No. :</p> */}
              {/* <p className="text-gray-400">Date Joined :</p> */}
              {/* <p className="text-gray-400">Address :</p> */}
            </div>
            <div className="flex flex-col space-y-3">
              <p className="text-gray-100">{user.email}</p>
              <p className="text-gray-100">{user.displayName}</p>
              {/* <p className="text-gray-100">user.phone</p> */}
              {/* <p className="text-gray-100">user.date_joined</p> */}
              {/* <p className="text-gray-100">customer.address</p> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <a
            href="/BookingHistory"
            className="rounded-xl bg-gray-400 p-2 text-gray-900"
          >
            Your Bookings History
          </a>
          <Button
            onClick={logout}
            className="rounded-xl bg-red-400 p-2 text-gray-900"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

// import { useSelector } from "react-redux";
// import { Button } from "../components/ui/button";
// import { useLogout } from "../hooks/useLogut";
// import SlightFlip from "../components/ui/flip-text";

// export default function Profile() {
//   const { user } = useSelector((state: any) => state.user);

//   console.log(user);

//   const { logout } = useLogout();

//   return (
//     <div>
//       <div className="border-2 m-10 mt-20 flex flex-col items-center justify-center rounded-2xl p-14 shadow-lg shadow-gray-900">
//         <SlightFlip word="Your Profile" />
//         <div className="flex items-center justify-center">
//           <img
//             src={user.photoURL}
//             alt={user.username}
//             className="h-60 w-60 rounded-xl"
//           />

//           <div className="m-10 flex flex-col space-y-4">
//             <div className="flex justify-between w-full">
//               <h1 className="text-gray-400">Fullname :</h1>
//               <p className="text-gray-100">{user.fullname}</p>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="text-gray-400">Email :</p>
//               <p className="text-gray-100">{user.email}</p>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="text-gray-400">Full Name :</p>
//               <p className="text-gray-100">{user.fullname}</p>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="text-gray-400">Mobile No. :</p>
//               <p className="text-gray-100">{user.phone}</p>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="text-gray-400">Date Joined :</p>
//               <p className="text-gray-100">{user.date_joined}</p>
//             </div>
//             <div className="flex justify-between w-full">
//               <p className="text-gray-400">Address :</p>
//               <p className="text-gray-100">{user.address}</p>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center justify-center space-x-4 mt-6">
//           <a href="/" className="rounded-xl bg-gray-400 p-2 text-gray-900">
//             Profile
//           </a>
//           <Button
//             onClick={logout}
//             className="rounded-xl bg-red-400 p-2 text-gray-900"
//           >
//             Logout
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

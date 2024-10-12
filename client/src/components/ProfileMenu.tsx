import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogut";
import { Link } from "react-router-dom";

export default function ProfileMenu() {
  const { user } = useSelector((state: any) => state.user);
  // console.log(user);

  const { logout } = useLogout();

  return (
    <div className=" pl-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="secondary" className="md:h-[3rem] h-[2.8rem]">
            <Avatar className=" border-slate-500 border-2 md:mr-4 h-8 w-8">
              <AvatarImage
                src={user?.photoURL}
                alt={user?.displayName}
                className=""
              />
              {/* <h1>{user?.email}</h1> */}
              {/* <p>{user?.photoURL}</p> */}
            </Avatar>
            <p className="md:flex hidden">{user?.displayName}</p>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/user/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>

          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

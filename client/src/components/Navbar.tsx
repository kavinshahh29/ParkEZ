import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";
import { ModeToggle } from "../reducers/theme-toggle";

export function Navbar() {
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="border-b p-2 shadow-md flex justify-around items-center z-50">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link className="flex justify-center items-center" to="/">
              <img
                src="images/logo2.png"
                alt=""
                className="md:flex hidden h-12 rounded-md mx-3"
              />
              <img
                src="images/parkezz_logo.png"
                alt=""
                className="md:hidden border flex rounded-full md:mx-3"
              />

              {/* <h1 className="text-2xl font-bold ml-2"></h1> */}
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/parking">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Parking
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/about">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About Us
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex justify-center items-center space-x-2">
        {user && <ProfileMenu />}
        <ModeToggle />
      </div>
    </div>
  );
}

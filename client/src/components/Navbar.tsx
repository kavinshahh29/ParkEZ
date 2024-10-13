import * as React from "react";

import { cn } from "../lib/utils";

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
            <ListItem
              key="home"
              title="Home"
              href="/"
              className={""}
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ListItem
              key="parking"
              title="Parking"
              href="/parkings"
              className={""}
            />
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
      {/* {user? <Button className="ml-auto " variant={"outline"}>{user.username}</Button> : ""} */}
      {/* { !user    && */}
      {/* <Button className="ml-auto"><Link to="/login">Login</Link></Button> */}
      {/* } */}
    </div>
  );
}

const ListItem = React.forwardRef(
  (
    {
      className,
      title,

      href,
      ...rest
    }: {
      className: string;
      title: string;

      href: string;
    },
    ref
  ) => {
    return (
      <li>
        <Link
          to={href}
          ref={ref as React.LegacyRef<HTMLAnchorElement>}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...rest}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </Link>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

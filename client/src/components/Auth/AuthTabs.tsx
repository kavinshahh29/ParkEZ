"use client";

// import { useState } from "react";
import { Tabs } from "../ui/tabs"
import { LoginForm  } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export function AuthTabs( {googleLogin } : any) {
  
  const tabs = [
    {
      title: "Sign Up",
      value: "signup",
      content: <SignUpForm />,
    },
    {
      title: "Log In",
      value: "login",
      content: <LoginForm googleLogin={googleLogin}/>,
    },
  ];
  return (
    <div className="h-[30rem] relative flex flex-col w-[30rem]  mx-auto items-center justify-center ">
      <Tabs tabs={tabs} />
    </div>
  );
}

"use client";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function TypeWriter() {
  const words = [
    {
      text: "Find",
      className : "md:text-6xl text-lg"
      
    },
    {
      text: "secure",
      className : "md:text-6xl text-lg"


    },
    {
      text: "parking",
      className : "md:text-6xl text-lg"


    },
    {
      text: "spots with",
      className : "md:text-6xl  text-lg"


    },
    {
      text: "ParkEZ.",
      className: "text-blue-500 dark:text-blue-500 md:text-6xl text-lg",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
        Your convenient parking solution starts here
      </p>
      <div className="">
      <TypewriterEffectSmooth words={words} />

      </div>
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Find Parking
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
          List Your Spot
        </button>
      </div> */}
    </div>
  );
}

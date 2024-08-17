import { useEffect, useRef } from "react";
import { WobbleCard } from "./ui/wobble-card";
import createGlobe from "cobe";

export function WobbleCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:max-w-7xl max-w-4xl md:mx-auto w-full mt-24">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 max-w-xs  md:max-w-4xl h-full bg-green-800 min-h-[350px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-sm">
          <h2 className="text-left text-balance text-md md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Real-Time Parking Availability
          </h2>
          <p className="mt-4  text-left md:text-base/6 text-xs text-neutral-200">
            Get instant updates on parking spots available in your area. ParkEZ
            uses advanced algorithms and live data to provide accurate
            information, so you can find parking quickly and easily.
          </p>
        </div>
        <img
          src="images/map1.png"
          width={500}
          height={500}
          alt="real-time parking demo"
          className="hidden md:flex absolute -right-4 lg:-right-[10%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
        <img
          src="images/map1.png"
          width={250}
          height={250}
          alt="real-time parking demo"
          className="md:hidden absolute  -right-0 lg:-right-[10%] grayscale filter -bottom-4 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-yellow-700  max-w-xs  md:max-w-4xl">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Seamless Navigation
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Navigate to your parking spot with ease. ParkEZ integrates with your
          favorite maps to guide you directly to available spaces, ensuring a
          smooth parking experience.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 md:h-[20rem] h-full  max-w-xs md:max-w-7xl">
        <div className="">
          <div className="max-w-sm ">
            <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              ParkEZ: Parking Simplified Globally
            </h2>
            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200 ">
              ParkEZ isn't just for local parking—it's a global solution.
              Whether you're in a bustling city or a quiet town, ParkEZ is here
              to help you find parking effortlessly, wherever you go.
            </p>
          </div>
          <SkeletonGlob />
        </div>
      </WobbleCard>
    </div>
  );
}
export const SkeletonGlob = () => {
  return (
    <div>
      <div className="hidden h-60 md:h-60 md:flex  flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
        <Globe className="absolute -right-10 md:-right-10 -bottom-20 md:-bottom-12" width={600} height={600}/>
      </div>
      <div className="flex md:hidden h-52 md:h-60   flex-col items-center relative bg-transparent dark:bg-transparent mt-10">
        <Globe className="absolute -right-0 md:-right-10 -bottom-10 md:-bottom-12" width={300} height={300}/>
      </div>
      
    </div>
  );
};

export const Globe = ({ className  , width , height }: { className?: string , width? : any , height?:  any } ) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: height * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 20000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.5, 0.5, 0.5],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state: any) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

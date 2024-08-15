import { FlipWords } from "./ui/flip-words";

export default function FlipWordsComp() {
  const words = ["convenient", "hassle-free", "quick", "efficient"];

  return (
    <div className="h-full flex justify-center items-center px-4 mb-10">
      <div className="text-xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
      Enjoy
        <FlipWords words={words} /> 
        Parking
      </div>
    </div>
  );
}

"use client";

import { twMerge } from "tailwind-merge";

interface StartPlayingScreenProps {
  onClick: () => void;
  startGame: boolean;
}

function StartPlayingScreen({ onClick, startGame }: StartPlayingScreenProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full absolute flex items-center justify-center transition",
        startGame && "animate-hide-start-playing",
        !startGame && "animate-show-start-playing",
      )}
    >
      <div
        className={twMerge(
          "h-full w-full absolute backdrop-blur-sm",
          startGame && "animate-fade-out-start-playing",
          !startGame && "animate-fade-in-start-playing",
        )}
      ></div>
      <div
        className={twMerge(
          "w-[36rem] h-[18rem] z-10 flex items-center justify-center bg-white/50 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-md",
          startGame && "animate-fade-out-start-playing",
          !startGame && "animate-fade-in-start-playing",
        )}
      >
        <button
          onClick={onClick}
          className="uppercase font-bold tracking-wide text-3xl border-2 border-teal-400 px-6 py-3 rounded-md bg-teal-300 shadow-md hover:bg-teal-400 transition text-teal-950 active:shadow-sm"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StartPlayingScreen;

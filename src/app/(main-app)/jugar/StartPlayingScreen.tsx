"use client";

import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  startGame: boolean;
}

function StartPlayingScreen({ onClick, startGame }: Props) {
  return (
    <div
      className={twMerge(
        "absolute flex h-full w-full items-center justify-center transition",
        startGame && "animate-hide-start-playing",
        !startGame && "animate-show-start-playing",
      )}
    >
      <div
        className={twMerge(
          "absolute h-full w-full backdrop-blur-sm",
          startGame && "animate-fade-out-start-playing",
          !startGame && "animate-fade-in-start-playing",
        )}
      ></div>
      <div
        className={twMerge(
          "z-10 flex h-[18rem] w-[36rem] items-center justify-center rounded-xl border-2 border-white/50 bg-white/50 shadow-md backdrop-blur-md",
          startGame && "animate-fade-out-start-playing",
          !startGame && "animate-fade-in-start-playing",
        )}
      >
        <button
          onClick={onClick}
          className="rounded-md border-2 border-teal-400 bg-teal-300 px-6 py-3 text-3xl font-extrabold uppercase tracking-wide text-teal-950 shadow-md transition hover:bg-teal-400 active:shadow-sm"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StartPlayingScreen;

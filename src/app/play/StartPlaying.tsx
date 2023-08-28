"use client";

import { twMerge } from "tailwind-merge";

interface StartPlayingProps {
  onClick: () => void;
  className: string;
}

function StartPlaying({ onClick, className }: StartPlayingProps) {
  return (
    <div
      className={twMerge(
        "h-full w-full absolute flex items-center justify-center",
        className,
      )}
    >
      <div className="h-full w-full absolute backdrop-blur-sm"></div>
      <div className="w-[36rem] h-[18rem] z-10 flex items-center justify-center bg-white/50 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-md">
        <button
          onClick={onClick}
          className="uppercase font-bold tracking-wide text-3xl border border-teal-400 px-6 py-3 rounded-md bg-teal-300 shadow-md hover:bg-teal-400 transition text-teal-950 active:shadow-sm"
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default StartPlaying;

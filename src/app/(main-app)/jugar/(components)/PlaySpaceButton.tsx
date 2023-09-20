"use client";

import { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  isSpacePressed: boolean;
  setIsSpacePressed: React.Dispatch<React.SetStateAction<boolean>>;
}

function PlaySpaceButton({ isSpacePressed, setIsSpacePressed }: Props) {
  const spaceButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.code === "Space") {
        setIsSpacePressed(true);
        spaceButtonRef.current?.focus();
      }
    },
    [setIsSpacePressed],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <button
      onClick={() => setIsSpacePressed(true)}
      ref={spaceButtonRef}
      className={twMerge(
        "relative my-2 h-20 w-full max-w-[min(24rem,95vw)] -translate-y-2 rounded-lg border-4 border-slate-600 bg-slate-100 shadow-xl shadow-black/60 transition duration-300 focus:outline-none sm:max-w-md md:max-w-lg xl:h-24 xl:max-w-xl 2xl:h-28 2xl:max-w-3xl",
        isSpacePressed &&
          "translate-y-0 bg-slate-200 shadow-sm shadow-black/30",
      )}
    >
      <div className="absolute right-1/2 top-[17.5%] h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-600"></div>
    </button>
  );
}

export default PlaySpaceButton;

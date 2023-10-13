"use client";

import { useCallback, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  isSpacePressed: boolean;
  setIsSpacePressed: React.Dispatch<React.SetStateAction<boolean>> | null;
  type?: "small" | "big";
}

function PlayTutorialSpaceButton({
  isSpacePressed,
  setIsSpacePressed,
  type = "big",
}: Props) {
  const spaceButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (type === "small") return;
      if (e.code === "Space") {
        setIsSpacePressed && setIsSpacePressed(true);
        spaceButtonRef.current?.focus();
      }
    },
    [setIsSpacePressed, type],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <button
      onClick={() => setIsSpacePressed && setIsSpacePressed(true)}
      ref={spaceButtonRef}
      className={twMerge(
        "relative h-20 w-full max-w-[min(24rem,95vw)] -translate-y-2 rounded-lg border-4 border-slate-600 bg-slate-100 shadow-xl shadow-black/60 transition duration-300 focus:outline-none sm:max-w-md md:max-w-lg xl:h-20 xl:max-w-xl 2xl:h-20 2xl:max-w-3xl xl:h-sm:h-24 2xl:h-sm:h-28",
        type === "small" &&
          "mt-1 h-[10svh] w-[30svh] border-[3px] xl:h-[10svh] 2xl:h-[10svh] h-sm:mt-0 xl:h-sm:h-[10svh] 2xl:h-sm:h-[10svh] h-md:w-[40svh] h-md:border-4",
        isSpacePressed &&
          "translate-y-0 bg-slate-200 shadow-sm shadow-black/30",
      )}
    >
      <div
        className={twMerge(
          "absolute right-1/2 top-[17.5%] h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-600",
          type === "small" && "h-[3px] h-md:h-1",
        )}
      ></div>
    </button>
  );
}

export default PlayTutorialSpaceButton;

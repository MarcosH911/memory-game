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
        "relative h-28 w-full max-w-3xl -translate-y-2 rounded-lg border-4 border-slate-600 bg-slate-100 shadow-xl shadow-black/60 transition duration-300 focus:outline-none",
        isSpacePressed &&
          "translate-y-0 bg-slate-200 shadow-sm shadow-black/30",
      )}
    >
      <div className="absolute right-1/2 top-5 h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-600"></div>
    </button>
  );
}

export default PlaySpaceButton;

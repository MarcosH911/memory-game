"use client";

import { useEffect, useRef, useState } from "react";

import Square from "./Square";
import sleep from "@/helpers/sleep";
import { twMerge } from "tailwind-merge";
import StartPlayingScreen from "./StartPlayingScreen";

const baseSequenceLength = 20;
const numTargets = 6;

function Page() {
  const [level, setLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const spaceButtonRef = useRef<HTMLButtonElement | null>(null);
  const correctHits = useRef(0);
  const incorrectHits = useRef(0);
  const isFirstTime = useRef(true);
  const levelChange = useRef<1 | 0 | -1>(0);

  const generatedSequence: number[] = [];

  const getTargetsCount = () => {
    let count = 0;
    for (let i = level; i < generatedSequence.length; i++) {
      if (generatedSequence[i] === generatedSequence[i - level]) {
        count++;
      }
    }
    return count;
  };

  const playGame = async () => {
    if (isPlaying) return;

    setIsPlaying(true);
    generatedSequence.length = 0;

    for (let i = 0; i < baseSequenceLength + level; i++) {
      generatedSequence.push(Math.trunc(Math.random() * 8));
    }

    let targetsCount = getTargetsCount();
    while (targetsCount != numTargets) {
      const randomIndex = Math.trunc(
        Math.random() * (generatedSequence.length - level) + level,
      );
      const changeFirst = !Math.trunc(Math.random() * 2);
      if (
        targetsCount > numTargets &&
        generatedSequence[randomIndex] ===
          generatedSequence[randomIndex - level]
      ) {
        if (changeFirst) {
          generatedSequence[randomIndex - level] = Math.trunc(
            Math.random() * 8,
          );
        } else {
          generatedSequence[randomIndex] = Math.trunc(Math.random() * 8);
        }
      } else if (
        targetsCount < numTargets &&
        generatedSequence[randomIndex] !==
          generatedSequence[randomIndex - level]
      ) {
        if (changeFirst) {
          generatedSequence[randomIndex - level] =
            generatedSequence[randomIndex];
        } else {
          generatedSequence[randomIndex] =
            generatedSequence[randomIndex - level];
        }
      }
      targetsCount = getTargetsCount();
    }

    await sleep(1000);

    correctHits.current = 0;
    incorrectHits.current = 0;
    isFirstTime.current = false;

    for (let i = 0; i < generatedSequence.length; i++) {
      setSelectedSquare(generatedSequence[i]);
      await sleep(700);
      setSelectedSquare(null);
      await sleep(2300);

      setIsSpacePressed((isPressed) => {
        if (isPressed) {
          if (
            i >= level &&
            generatedSequence[i] === generatedSequence[i - level]
          ) {
            correctHits.current++;
          } else {
            incorrectHits.current++;
          }
        }
        return false;
      });
    }

    const insertPointsPromise = fetch("/api/play/insert-points", {
      method: "post",
      body: JSON.stringify({ coins: level, diamonds: 1 }),
    });

    let insertLevelPromise: null | Promise<Response> = null;

    if (correctHits.current - incorrectHits.current >= (numTargets * 4) / 5) {
      setLevel((level) => {
        insertLevelPromise = fetch("/api/play/update-level", {
          method: "post",
          body: JSON.stringify({ level: level + 1 }),
        });
        levelChange.current = 1;
        return level + 1;
      });
    } else if (
      correctHits.current - incorrectHits.current < numTargets / 2 &&
      level > 1
    ) {
      setLevel((level) => {
        insertLevelPromise = fetch("/api/play/update-level", {
          method: "post",
          body: JSON.stringify({ level: level - 1 }),
        });
        levelChange.current = -1;
        return level - 1;
      });
    } else {
      levelChange.current = 0;
    }

    setIsPlaying(false);
    if (insertLevelPromise) {
      await Promise.all([insertPointsPromise, insertLevelPromise]);
    } else {
      await Promise.all([insertPointsPromise]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === "Space") {
      setIsSpacePressed(true);
      spaceButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    const getUserLevel = async () => {
      const res = await fetch("/api/play/user-level", {
        method: "GET",
      });
      setLevel(await res.json());
    };

    getUserLevel();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="h-full flex items-center justify-start flex-col">
      <StartPlayingScreen
        onClick={playGame}
        isFirstTime={isFirstTime.current}
        levelChange={levelChange.current}
        isPlaying={isPlaying}
        correctHits={correctHits.current}
        mistakes={incorrectHits.current + (numTargets - correctHits.current)}
      />
      <h1 className="rounded-lg border border-teal-200 bg-teal-100 px-6 py-3 text-7xl font-bold text-teal-950 shadow-md shadow-teal-200/50 mb-4 mt-6">
        Level {level}
      </h1>
      <div className="relative grid grid-cols-3 grid-rows-3 aspect-square h-2/3 mb-4">
        {Array(8)
          .fill(true)
          .map((_, index) => (
            <Square
              key={index}
              index={index}
              isSelected={selectedSquare === index}
            />
          ))}
        <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-[calc(1%-1px)] h-[calc(7.5%-1px)] rounded-full bg-teal-300"></div>
        <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-[calc(7.5%-1px)] h-[calc(1%-1px)] rounded-full bg-teal-300"></div>
        <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-[1%] h-[7.5%] rounded-full bg-teal-600 -z-10"></div>
        <div className="absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 w-[7.5%] h-[1%] rounded-full bg-teal-600 -z-10"></div>
      </div>
      <button
        onClick={() => setIsSpacePressed(true)}
        ref={spaceButtonRef}
        className={twMerge(
          "relative h-28 max-w-3xl w-full border-slate-600 border-4 rounded-lg bg-slate-100 -translate-y-2 shadow-xl shadow-black/60 transition duration-300 focus:outline-none -z-10",
          isSpacePressed &&
            "shadow-sm shadow-black/30 translate-y-0 bg-slate-200",
        )}
      >
        <div className="absolute h-1.5 w-1/6 bg-slate-600 rounded-full right-1/2 translate-x-1/2 top-5"></div>
      </button>
    </div>
  );
}

export default Page;

"use client";

import { useEffect, useRef, useState } from "react";

import sleep from "@/helpers/sleep";
import PlaySquare from "./(components)/PlaySquare";
import PlayStartScreen from "./(components)/PlayStartScreen";
import PlayLevelTitle from "./(components)/PlayLevelTitle";
import PlayCenterCrosshair from "./(components)/PlayCenterCrosshair";
import PlaySpaceButton from "./(components)/PlaySpaceButton";

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
      const userLevelDataResponse = await fetch("/api/play/user-level", {
        method: "GET",
      });
      const { userLevel } = await userLevelDataResponse.json();
      setLevel(userLevel);
    };

    getUserLevel();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-start">
      <PlayStartScreen
        onClick={playGame}
        isFirstTime={isFirstTime.current}
        levelChange={levelChange.current}
        isPlaying={isPlaying}
        correctHits={correctHits.current}
        mistakes={incorrectHits.current + (numTargets - correctHits.current)}
      />
      <PlayLevelTitle level={level} />
      <div className="relative mb-4 grid aspect-square h-2/3 grid-cols-3 grid-rows-3">
        {Array(8)
          .fill(true)
          .map((_, index) => (
            <PlaySquare
              key={index}
              index={index}
              isSelected={selectedSquare === index}
            />
          ))}
        <PlayCenterCrosshair />
      </div>
      <PlaySpaceButton
        onClick={() => setIsSpacePressed(true)}
        spaceButtonRef={spaceButtonRef}
        isSpacePressed={isSpacePressed}
      />
    </div>
  );
}

export default Page;

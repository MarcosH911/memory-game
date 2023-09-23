"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import sleep from "@/helpers/sleep";
import PlayCenterCrosshair from "./(components)/PlayCenterCrosshair";
import PlaySpaceButton from "./(components)/PlaySpaceButton";
import PlaySquare from "./(components)/PlaySquare";
import PlayStartScreen from "./(components)/PlayStartScreen";
import PlayLevelTitle from "./(components)/PlayLevelTitle";

const baseSequenceLength = 20;
const numTargets = 6;

function PlayGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [level, setLevel] = useState(1);

  const generatedSequence = useRef<number[]>([]);
  const isInserting = useRef(false);
  const correctHits = useRef(0);
  const incorrectHits = useRef(0);
  const isFirstTime = useRef(true);
  const levelChange = useRef<1 | 0 | -1>(0);

  const router = useRouter();
  const pathname = usePathname();

  const getTargetsCount = useCallback(() => {
    let count = 0;
    for (let i = level; i < generatedSequence.current.length; i++) {
      if (
        generatedSequence.current[i] === generatedSequence.current[i - level]
      ) {
        count++;
      }
    }
    return count;
  }, [level]);

  const getGeneratedSequence = useCallback(() => {
    generatedSequence.current = [];

    for (let i = 0; i < baseSequenceLength + level; i++) {
      generatedSequence.current.push(Math.trunc(Math.random() * 8));
    }

    let targetsCount = getTargetsCount();
    while (targetsCount != numTargets) {
      const randomIndex = Math.trunc(
        Math.random() * (generatedSequence.current.length - level) + level,
      );
      const changeFirst = !Math.trunc(Math.random() * 2);
      if (
        targetsCount > numTargets &&
        generatedSequence.current[randomIndex] ===
          generatedSequence.current[randomIndex - level]
      ) {
        if (changeFirst) {
          generatedSequence.current[randomIndex - level] = Math.trunc(
            Math.random() * 8,
          );
        } else {
          generatedSequence.current[randomIndex] = Math.trunc(
            Math.random() * 8,
          );
        }
      } else if (
        targetsCount < numTargets &&
        generatedSequence.current[randomIndex] !==
          generatedSequence.current[randomIndex - level]
      ) {
        if (changeFirst) {
          generatedSequence.current[randomIndex - level] =
            generatedSequence.current[randomIndex];
        } else {
          generatedSequence.current[randomIndex] =
            generatedSequence.current[randomIndex - level];
        }
      }
      targetsCount = getTargetsCount();
    }
  }, [getTargetsCount, level]);

  const playGame = async () => {
    if (isPlaying) return;

    setIsPlaying(true);

    do {
      await sleep(500);
    } while (isInserting.current);

    await sleep(1000);

    correctHits.current = 0;
    incorrectHits.current = 0;
    isFirstTime.current = false;

    for (let i = 0; i < generatedSequence.current.length; i++) {
      setSelectedSquare(generatedSequence.current[i]);
      await sleep(700);
      setSelectedSquare(null);
      await sleep(2300);

      setIsSpacePressed((isPressed) => {
        if (isPressed) {
          if (
            i >= level &&
            generatedSequence.current[i] ===
              generatedSequence.current[i - level]
          ) {
            correctHits.current++;
          } else {
            incorrectHits.current++;
          }
        }
        return false;
      });
    }

    insertData();
  };

  const insertData = async () => {
    const insertPointsPromise = fetch("/api/points/insert-points", {
      method: "post",
      body: JSON.stringify({ coins: level, diamonds: 1 }),
    });

    let insertLevelPromise: null | Promise<Response> = null;

    if (correctHits.current - incorrectHits.current >= (numTargets * 4) / 5) {
      insertLevelPromise = fetch("/api/play/update-level", {
        method: "post",
        body: JSON.stringify({ level: level + 1 }),
      });
      setLevel((level) => level + 1);
      levelChange.current = 1;
    } else if (
      correctHits.current - incorrectHits.current < numTargets / 2 &&
      level > 1
    ) {
      insertLevelPromise = fetch("/api/play/update-level", {
        method: "post",
        body: JSON.stringify({ level: level - 1 }),
      });
      setLevel((level) => level - 1);
      levelChange.current = -1;
    } else {
      levelChange.current = 0;
    }

    setIsPlaying(false);

    isInserting.current = true;
    if (insertLevelPromise) {
      await Promise.all([insertPointsPromise, insertLevelPromise]);
    } else {
      await Promise.all([insertPointsPromise]);
    }
    isInserting.current = false;

    router.refresh();
  };

  useEffect(() => {
    const initGame = async () => {
      if (isFirstTime) {
        const response = await fetch("/api/play/get-level", { method: "get" });
        const { data: userLevel } = await response.json();
        setLevel(userLevel);
      }

      getGeneratedSequence();
    };

    initGame();
  }, [getGeneratedSequence]);

  useEffect(() => {
    if (isPlaying) {
      router.push(pathname + "?playing=true");
    } else {
      router.push(pathname);
    }
  }, [isPlaying, pathname, router]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <PlayLevelTitle level={level} />
      <PlayStartScreen
        onClick={playGame}
        isFirstTime={isFirstTime.current}
        levelChange={levelChange.current}
        isPlaying={isPlaying}
        correctHits={correctHits.current}
        mistakes={incorrectHits.current + (numTargets - correctHits.current)}
      />
      <div className="relative mb-16 grid aspect-square h-[min(66.7%,95vw)] grid-cols-3 grid-rows-3 sm:mb-4">
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
        isSpacePressed={isSpacePressed}
        setIsSpacePressed={setIsSpacePressed}
      />
    </div>
  );
}

export default PlayGame;

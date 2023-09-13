"use client";

import { use, useRef, useState } from "react";
import PlayCenterCrosshair from "./PlayCenterCrosshair";
import PlaySpaceButton from "./PlaySpaceButton";
import PlaySquare from "./PlaySquare";
import PlayStartScreen from "./PlayStartScreen";
import sleep from "@/helpers/sleep";
import { useRouter } from "next/navigation";

interface Props {
  generatedSequence: number[];
  numTargets: number;
  level: number;
}

function PlayGame({ generatedSequence, numTargets, level }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  const correctHits = useRef(0);
  const incorrectHits = useRef(0);
  const isFirstTime = useRef(true);
  const levelChange = useRef<1 | 0 | -1>(0);

  const router = useRouter();

  const playGame = async () => {
    if (isPlaying) return;

    setIsPlaying(true);

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

    insertData();
  };

  const insertData = async () => {
    const insertPointsPromise = fetch("/api/play/insert-points", {
      method: "post",
      body: JSON.stringify({ coins: level, diamonds: 1 }),
    });

    let insertLevelPromise: null | Promise<Response> = null;

    if (correctHits.current - incorrectHits.current >= (numTargets * 4) / 5) {
      insertLevelPromise = fetch("/api/play/update-level", {
        method: "post",
        body: JSON.stringify({ level: level + 1 }),
      });
      levelChange.current = 1;
    } else if (
      correctHits.current - incorrectHits.current < numTargets / 2 &&
      level > 1
    ) {
      insertLevelPromise = fetch("/api/play/update-level", {
        method: "post",
        body: JSON.stringify({ level: level - 1 }),
      });
      levelChange.current = -1;
    } else {
      levelChange.current = 0;
    }

    setIsPlaying(false);
    if (insertLevelPromise) {
      await Promise.all([insertPointsPromise, insertLevelPromise]);
    } else {
      await Promise.all([insertPointsPromise]);
    }

    router.refresh();
  };

  return (
    <>
      <PlayStartScreen
        onClick={playGame}
        isFirstTime={isFirstTime.current}
        levelChange={levelChange.current}
        isPlaying={isPlaying}
        correctHits={correctHits.current}
        mistakes={incorrectHits.current + (numTargets - correctHits.current)}
      />
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
        isSpacePressed={isSpacePressed}
        setIsSpacePressed={setIsSpacePressed}
      />
    </>
  );
}

export default PlayGame;

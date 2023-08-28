"use client";

import Square from "@/components/Square";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import StartPlaying from "./StartPlaying";

function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(true);
  const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);

  const restartGame = () => {
    setIsPlaying(false);
    setHasLost(false);
    setIsPlayerTurn(false);
    setIsComputerTurn(true);
    setGeneratedSequence([]);
    setPlayerSequence([]);
    setLevel(1);
  };

  useEffect(() => {
    if (!isPlaying || !isComputerTurn) {
      return;
    }

    let timesRun = 0;
    let isLastInterval = false;

    const interval = setInterval(() => {
      if (!isLastInterval) {
        setGeneratedSequence((sequence) => {
          let randomSquare = -1;
          do {
            randomSquare = Math.trunc(Math.random() * 9);
          } while (randomSquare === sequence.at(sequence.length - 1));
          return [...sequence, randomSquare];
        });
      }
      if (isLastInterval) {
        isLastInterval = false;
        setIsComputerTurn(false);
        clearInterval(interval);
      }

      if (++timesRun === level) {
        isLastInterval = true;
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isComputerTurn, isPlaying, level]);

  useEffect(() => {
    if (isComputerTurn) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsPlayerTurn(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, [isComputerTurn]);

  const handleSquareClick = (i: number) => {
    if (!isPlayerTurn) {
      return;
    }

    setPlayerSequence((sequence) => {
      if (i != generatedSequence.at(sequence.length)) {
        setHasLost(true);
        setIsPlaying(false);
        restartGame();
      } else if (sequence.length + 1 === generatedSequence.length) {
        setIsPlayerTurn(false);
        setIsComputerTurn(true);
        setLevel((level) => level + 1);
        setGeneratedSequence([]);
        return [];
      }

      return [...sequence, i];
    });
  };

  return (
    <>
      {!isPlaying && (
        <StartPlaying
          onClick={() => setIsPlaying(true)}
          className={twMerge(isPlaying && "hidden")}
        />
      )}
      <div className="h-full flex items-center justify-center">
        {hasLost && "You have lost"}
        <div className="h-[40rem] w-[40rem] grid grid-cols-3 grid-rows-3 gap-2 p-1">
          {Array(9)
            .fill(true)
            .map((_, i) => (
              <Square
                key={i}
                selected={
                  generatedSequence.at(generatedSequence.length - 1) === i
                }
                lost={hasLost}
                isPlayerTurn={isPlayerTurn}
                isComputerTurn={isComputerTurn}
                onClick={() => handleSquareClick(i)}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default Game;

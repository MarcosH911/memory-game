"use client";

import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import StartPlaying from "./StartPlayingScreen";
import Square from "./Square";
import { sleep } from "@/helpers/helpers";

function Game() {
  const [startGame, setStartGame] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(true);
  const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);

  const [playWinAnimation, setPlayWinAnimation] = useState(false);
  const [playLooseAnimation, setPlayLooseAnimation] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const userId = useRef<string | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const user = (await supabase.auth.getSession()).data.session?.user.id;
      userId.current = user;
    };

    getUser();
  }, [supabase.auth]);

  const updateDatabase = async (coins = 0, diamonds = 0) => {
    if (!userId.current) {
      console.error(
        "There was an error getting the user before inserting the points",
      );
      return;
    }

    const { error: insertError } = await supabase
      .from("points_transactions")
      .insert({
        user_id: userId.current,
        coins,
        diamonds,
      })
      .select();

    if (insertError) {
      console.error("There was an error inserting the points");
      return;
    }

    router.refresh();
  };

  const restartGame = () => {
    setStartGame(false);
    setIsPlaying(false);
    setHasLost(false);
    setIsPlayerTurn(false);
    setIsComputerTurn(true);
    setGeneratedSequence([]);
    setPlayerSequence([]);
    setLevel(1);
  };

  useEffect(() => {
    if (!startGame) return;

    const timeout = setTimeout(() => {
      setIsPlaying(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [startGame]);

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
    }, 250);

    return () => clearTimeout(timeout);
  }, [isComputerTurn]);

  const handleSquareClick = async (i: number) => {
    if (!isPlayerTurn) {
      return;
    }

    if (i != generatedSequence.at(playerSequence.length)) {
      updateDatabase((level * (level - 1)) / 2, level - 1);
      setHasLost(true);
      setIsPlayerTurn(false);
      setPlayLooseAnimation(true);
      await sleep(500);
      setPlayLooseAnimation(false);
      restartGame();
    } else if (playerSequence.length + 1 === generatedSequence.length) {
      setIsPlayerTurn(false);
      setPlayWinAnimation(true);
      await sleep(500);
      setPlayWinAnimation(false);
      setLevel((level) => level + 1);
      setGeneratedSequence([]);
      setPlayerSequence([]);
      setIsComputerTurn(true);
    } else {
      setPlayerSequence((sequence) => [...sequence, i]);
    }
  };

  return (
    <>
      <StartPlaying onClick={() => setStartGame(true)} startGame={startGame} />
      <div
        className={twMerge(
          "flex h-full flex-col items-center justify-center gap-7",
          playWinAnimation && "animate-win-game",
          playLooseAnimation && "animate-loose-game",
        )}
      >
        <h1 className="-mt-16 rounded-lg border border-teal-200 bg-teal-100 px-6 py-3 text-7xl font-semibold text-teal-950 shadow-md shadow-teal-200/50">
          Level {level}
        </h1>
        <div className="grid h-[30rem] w-[30rem] grid-cols-3 grid-rows-3 gap-2 p-1">
          {Array(9)
            .fill(true)
            .map((_, i) => (
              <Square
                key={i}
                selected={
                  generatedSequence.at(generatedSequence.length - 1) === i
                }
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

"use client";

import Square from "@/components/Square";
import { useEffect, useRef, useState } from "react";
import StartPlaying from "./StartPlayingScreen";
import { sleep } from "@/helpers/helpers";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

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
  const supabase = createClientComponentClient();
  const userId = useRef<string | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const user = (await supabase.auth.getSession()).data.session?.user.id;
      userId.current = user;
    };

    getUser();
  }, [supabase.auth]);

  const updateDatabase = async (coins = 0, diamonds = 0) => {
    const { data: currentData, error: selectError } = await supabase
      .from("points")
      .select("coins, diamonds")
      .eq("user_id", userId.current);

    if (selectError || !currentData) {
      console.error("There was an error selecting the points");
      return;
    }

    const { error: insertError } = await supabase
      .from("points")
      .update({
        coins: coins + currentData[0].coins,
        diamonds: diamonds + currentData[0].diamonds,
      })
      .eq("user_id", userId.current)
      .select();

    if (insertError) {
      console.error("There was an error inserting the points");
      console.error(insertError.message);
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
      updateDatabase((level * (level + 1)) / 2, level);
      setHasLost(true);
      await sleep(1);
      setIsPlayerTurn(false);
      setPlayLooseAnimation(true);
      await sleep(500);
      setPlayLooseAnimation(false);
      restartGame();
    } else if (playerSequence.length + 1 === generatedSequence.length) {
      await sleep(1);
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
          "h-full flex items-center justify-center flex-col gap-7",
          playWinAnimation && "animate-win-game",
          playLooseAnimation && "animate-loose-game",
        )}
      >
        <h1 className="text-7xl -mt-16 font-semibold border rounded-lg px-6 py-3 bg-teal-100 shadow-md border-teal-200 shadow-teal-200/50 text-teal-950">
          Level {level}
        </h1>
        <div className="h-[30rem] w-[30rem] grid grid-cols-3 grid-rows-3 gap-2 p-1">
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

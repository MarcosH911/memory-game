import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import Spinner from "@/components/Spinner";

interface Props {
  handleSpinRoulette: (type: "coins" | "diamonds") => Promise<void>;
  hasEnoughCoins: boolean;
  hasEnoughDiamonds: boolean;
  isSpinningRoulette: boolean;
}

function AvatarStoreRouletteBuyButtons({
  handleSpinRoulette,
  hasEnoughCoins,
  hasEnoughDiamonds,
  isSpinningRoulette,
}: Props) {
  const [isLoading, setIsLoading] = useState("");

  const handleBuy = async (type: "coins" | "diamonds") => {
    if (
      (!hasEnoughCoins && type == "coins") ||
      (!hasEnoughDiamonds && type == "diamonds")
    ) {
      return;
    }

    setIsLoading(type);
    await handleSpinRoulette(type);
    setIsLoading("");
  };

  return (
    <div className="sm:mt-8 xs:mt-6 mt-4 flex items-center justify-center xs:gap-4 gap-3 sm:gap-8">
      <button
        onClick={() => handleBuy("coins")}
        disabled={!hasEnoughCoins || isSpinningRoulette || isLoading !== ""}
        className="relative flex items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 sm:px-12 sm:py-3 xs:px-8 xs:py-2 px-5 py-1.5 text-yellow-600 shadow-md shadow-yellow-600/30 transition duration-200 hover:bg-yellow-100 hover:shadow-lg hover:shadow-yellow-600/40 active:shadow-md active:duration-100 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:shadow-none"
      >
        <Spinner visible={isLoading === "coins"} size="4xl" />
        <span
          className={twMerge(
            "visible text-2xl sm:text-3xl font-bold",
            isLoading === "coins" && "invisible",
          )}
        >
          60
        </span>
        <BiSolidCoinStack
          className={twMerge(
            "visible text-xl sm:text-2xl",
            isLoading === "coins" && "invisible",
          )}
        />
      </button>
      <button
        onClick={() => handleBuy("diamonds")}
        disabled={!hasEnoughDiamonds || isSpinningRoulette || isLoading !== ""}
        className="relative flex items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 sm:px-12 sm:py-3 xs:px-8 xs:py-2 px-5 py-1.5 text-purple-50 shadow-md shadow-purple-600/30 transition duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/40 active:shadow-md active:duration-100 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:text-slate-50 disabled:shadow-none"
      >
        <Spinner visible={isLoading === "diamonds"} size="4xl" />
        <span
          className={twMerge(
            "visible text-2xl sm:text-3xl font-bold",
            isLoading === "diamonds" && "invisible",
          )}
        >
          15
        </span>
        <IoDiamond
          className={twMerge(
            "visible text-xl sm:text-2xl",
            isLoading === "diamonds" && "invisible",
          )}
        />
      </button>
    </div>
  );
}

export default AvatarStoreRouletteBuyButtons;

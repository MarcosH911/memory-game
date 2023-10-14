import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

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
    const pointsResponse = await fetch("/api/points/get-points", {
      cache: "no-store",
    });
    if (pointsResponse.status === 200) {
      const pointsData = await pointsResponse.json();
      if (pointsData.data.coins < 60 && type === "coins") {
        toast.error("No tienes suficientes monedas");
      } else if (pointsData.data.diamonds < 15 && type === "diamonds") {
        toast.error("No tienes suficientes diamantes");
      } else {
        await handleSpinRoulette(type);
      }
    } else {
      toast.error("Ha ocurrido un error inesperado");
    }
    setIsLoading("");
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-3 xs:mt-6 xs:gap-4 sm:mt-8 sm:gap-8">
      <button
        onClick={() => handleBuy("coins")}
        disabled={!hasEnoughCoins || isSpinningRoulette || isLoading !== ""}
        className="relative flex items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 px-5 py-1.5 text-yellow-600 shadow-md shadow-yellow-600/30 transition duration-200 hover:bg-yellow-100 hover:shadow-lg hover:shadow-yellow-600/40 active:shadow-md active:duration-100 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:shadow-none xs:px-8 xs:py-2 sm:px-12 sm:py-3"
      >
        <Spinner visible={isLoading === "coins"} size="4xl" />
        <span
          className={twMerge(
            "visible text-2xl font-bold sm:text-3xl",
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
        className="relative flex items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 px-5 py-1.5 text-purple-50 shadow-md shadow-purple-600/30 transition duration-200 hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-600/40 active:shadow-md active:duration-100 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:text-slate-50 disabled:shadow-none xs:px-8 xs:py-2 sm:px-12 sm:py-3"
      >
        <Spinner visible={isLoading === "diamonds"} size="4xl" />
        <span
          className={twMerge(
            "visible text-2xl font-bold sm:text-3xl",
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

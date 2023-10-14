"use client";

import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import Spinner from "@/components/Spinner";
import setSearchParams from "@/helpers/setSearchParams";
import toast from "react-hot-toast";

interface Props {
  avatarPath: string;
  userPoints: { coins: number; diamonds: number };
}

function AvatarStoreBuyButtons({ avatarPath, userPoints }: Props) {
  const [isLoading, setIsLoading] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient<Database>();

  const hasEnoughCoins = userPoints.coins >= 100;
  const hasEnoughDiamonds = userPoints.diamonds >= 25;

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
      if (pointsData.data.coins < 100 && type === "coins") {
        toast.error("No tienes suficientes monedas");
        setIsLoading("");
        return;
      } else if (pointsData.data.diamonds < 25 && type === "diamonds") {
        toast.error("No tienes suficientes diamantes");
        setIsLoading("");
        return;
      }
    } else {
      toast.error("Ha ocurrido un error inesperado");
      setIsLoading("");
      return;
    }

    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }

    const insertAvatarPromise = supabase
      .from("avatars_transactions")
      .insert([{ user_id: userId, avatar_path: avatarPath }]);

    const insertPointsPromise = await supabase
      .from("points_transactions")
      .insert([
        {
          user_id: userId,
          coins: type == "coins" ? -100 : 0,
          diamonds: type == "diamonds" ? -25 : 0,
        },
      ]);

    const [{ error: insertAvatarError }, { error: insertPointsError }] =
      await Promise.all([insertAvatarPromise, insertPointsPromise]);

    if (insertPointsError) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }
    if (insertAvatarError) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }

    router.replace(
      setSearchParams(pathname, searchParams, [["hasBoughtAvatar", "true"]]),
      { scroll: false },
    );
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => handleBuy("coins")}
        disabled={!hasEnoughCoins || isLoading !== ""}
        className="relative mb-2 flex w-3/4 items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 py-1 text-yellow-600 shadow-[0_0_10px_1px] shadow-yellow-600/20 transition duration-200 hover:bg-yellow-100 hover:shadow-yellow-600/40 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-100 disabled:text-slate-600 disabled:shadow-none"
      >
        <Spinner visible={isLoading === "coins"} size="2xl" />
        <span
          className={twMerge(
            "visible text-lg font-bold",
            isLoading === "coins" && "invisible",
          )}
        >
          100
        </span>
        <BiSolidCoinStack
          className={twMerge(
            "visible text-xl",
            isLoading === "coins" && "invisible",
          )}
        />
      </button>
      <button
        disabled={!hasEnoughDiamonds || isLoading !== ""}
        onClick={() => handleBuy("diamonds")}
        className="relative flex w-3/4 items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 py-1 text-purple-50 shadow-[0_0_10px_1px] shadow-purple-600/30 transition duration-200 hover:border-purple-700 hover:bg-purple-700 hover:shadow-purple-600/60 disabled:cursor-not-allowed disabled:border-slate-500 disabled:bg-slate-500 disabled:text-slate-50 disabled:shadow-none"
      >
        <Spinner visible={isLoading === "diamonds"} size="2xl" />
        <span
          className={twMerge(
            "visible text-lg font-bold",
            isLoading === "diamonds" && "invisible",
          )}
        >
          25
        </span>
        <IoDiamond
          className={twMerge(
            "visible text-xl",
            isLoading === "diamonds" && "invisible",
          )}
        />
      </button>
    </>
  );
}

export default AvatarStoreBuyButtons;

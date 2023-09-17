"use client";

import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useRef, useState } from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

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
  const hasEnoughDiamonds = userPoints.coins >= 25;

  const getQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleBuy = async (type: "coins" | "diamonds") => {
    if (
      (!hasEnoughCoins && type == "coins") ||
      (!hasEnoughDiamonds && type == "diamonds")
    ) {
      return;
    }

    setIsLoading(type);

    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      console.error("There was an error getting the user");
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
      console.error("There was an error inserting the points");
    }
    if (insertAvatarError) {
      console.error("There was an error inserting the avatar");
      return;
    }

    router.replace(pathname + "?" + getQueryString("hasBoughtAvatar", "true"), {
      scroll: false,
    });
    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => handleBuy("coins")}
        disabled={!hasEnoughCoins || isLoading !== ""}
        className="mb-2 flex relative w-3/4 items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 py-1 text-yellow-600 shadow-[0_0_10px_1px] shadow-yellow-600/20 transition duration-200 hover:bg-yellow-100 hover:shadow-yellow-600/40 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:border-slate-600 disabled:text-slate-600 disabled:shadow-none"
      >
        <CgSpinnerTwoAlt
          className={twMerge(
            "animate-spin text-2xl opacity-0 absolute inset-0 m-auto",
            isLoading === "coins" && "opacity-100",
          )}
        />
        <span
          className={twMerge(
            "text-lg font-bold opacity-100",
            isLoading === "coins" && "opacity-0",
          )}
        >
          100
        </span>
        <BiSolidCoinStack
          className={twMerge(
            "text-xl opacity-100",
            isLoading === "coins" && "opacity-0",
          )}
        />
      </button>
      <button
        disabled={!hasEnoughDiamonds || isLoading !== ""}
        onClick={() => handleBuy("diamonds")}
        className="relative flex w-3/4 items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 py-1 text-purple-50 shadow-[0_0_10px_1px] shadow-purple-600/30 transition duration-200 hover:border-purple-700 hover:bg-purple-700 hover:shadow-purple-600/60 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:border-slate-500 disabled:text-slate-50 disabled:shadow-none"
      >
        <CgSpinnerTwoAlt
          className={twMerge(
            "animate-spin text-2xl opacity-0 absolute inset-0 m-auto",
            isLoading === "diamonds" && "opacity-100",
          )}
        />
        <span
          className={twMerge(
            "text-lg font-bold opacity-100",
            isLoading === "diamonds" && "opacity-0",
          )}
        >
          25
        </span>
        <IoDiamond
          className={twMerge(
            "text-xl opacity-100",
            isLoading === "diamonds" && "opacity-0",
          )}
        />
      </button>
    </>
  );
}

export default AvatarStoreBuyButtons;

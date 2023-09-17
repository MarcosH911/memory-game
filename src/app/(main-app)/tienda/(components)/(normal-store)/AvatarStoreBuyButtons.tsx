"use client";

import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useRef } from "react";

interface Props {
  avatarPath: string;
  userPoints: { coins: number; diamonds: number };
}

function AvatarStoreBuyButtons({ avatarPath, userPoints }: Props) {
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

    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      console.error("There was an error getting the user");
      return;
    }

    const { error: insertAvatarError } = await supabase
      .from("avatars_transactions")
      .insert([{ user_id: userId, avatar_path: avatarPath }]);

    if (insertAvatarError) {
      console.error("There was an error inserting the avatar");
      return;
    }

    if (type === "coins") {
      const { error: insertCoinsError } = await supabase
        .from("points_transactions")
        .insert([{ user_id: userId, coins: -100 }]);

      if (insertCoinsError) {
        console.error("There was an error inserting the coins");
      }
    } else if (type === "diamonds") {
      const { error: insertsDiamondsError } = await supabase
        .from("points_transactions")
        .insert([{ user_id: userId, diamonds: -25 }]);

      if (insertsDiamondsError) {
        console.error("There was an error inserting the diamonds");
      }
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
        disabled={!hasEnoughCoins}
        className="mb-2 flex w-3/4 items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 py-1 text-yellow-600 shadow-[0_0_10px_1px] shadow-yellow-600/20 transition duration-200 hover:bg-yellow-100 hover:shadow-yellow-600/40 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:border-slate-600 disabled:text-slate-600 disabled:shadow-none"
      >
        <span className="text-lg font-bold">100</span>
        <BiSolidCoinStack className="text-xl" />
      </button>
      <button
        disabled={!hasEnoughDiamonds}
        onClick={() => handleBuy("diamonds")}
        className="flex w-3/4 items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 py-1 text-purple-50 shadow-[0_0_10px_1px] shadow-purple-600/30 transition duration-200 hover:border-purple-700 hover:bg-purple-700 hover:shadow-purple-600/60 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:border-slate-500 disabled:text-slate-50 disabled:shadow-none"
      >
        <span className="text-lg font-bold">25</span>
        <IoDiamond className="text-xl" />
      </button>
    </>
  );
}

export default AvatarStoreBuyButtons;

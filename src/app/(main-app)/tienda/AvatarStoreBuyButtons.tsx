"use client";

import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface AvatarStoreBuyButtonsProps {
  avatarPath: string;
}

function AvatarStoreBuyButtons({ avatarPath }: AvatarStoreBuyButtonsProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleBuy = async (type: "coins" | "diamonds") => {
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

    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => handleBuy("coins")}
        className="flex items-center justify-center bg-yellow-50 shadow-[0_0_10px_1px] shadow-yellow-600/20 text-yellow-600 w-3/4 gap-1 py-1 rounded-md border-yellow-600 border mb-2 hover:bg-yellow-100 hover:shadow-yellow-600/40 transition duration-200"
      >
        <span className="font-bold text-lg">100</span>
        <BiSolidCoinStack className="text-xl" />
      </button>
      <button
        onClick={() => handleBuy("diamonds")}
        className="flex items-center justify-center shadow-[0_0_10px_1px] w-3/4 gap-1 py-1 rounded-md border-purple-600 border bg-purple-600 text-purple-50 shadow-purple-600/30 transition duration-200 hover:shadow-purple-600/60 hover:bg-purple-700 hover:border-purple-700"
      >
        <span className="font-bold text-lg">25</span>
        <IoDiamond className="text-xl" />
      </button>
    </>
  );
}

export default AvatarStoreBuyButtons;

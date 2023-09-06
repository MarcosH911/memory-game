"use client";

import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  avatarPath: string;
}

function AvatarStoreBuyButtons({ avatarPath }: Props) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleBuy = async (type: "coins" | "diamonds") => {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      console.error("There was an error getting the user");
      return;
    }

    const { data: userPointsData, error: userPointsError } = await supabase
      .from("user_points")
      .select("*")
      .single();

    if (
      userPointsError ||
      !userPointsData.total_coins ||
      !userPointsData.total_diamonds
    ) {
      console.error("Ha habido un error seleccionando los puntos del usuario");
      return;
    }

    if (type === "coins" && userPointsData.total_coins < 100) {
      console.error("No tienes suficientes monedas para comprar esto");
      return;
    } else if (type === "diamonds" && userPointsData.total_diamonds < 25) {
      console.error("No tienes suficientes diamantes para comprar esto");
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
        className="mb-2 flex w-3/4 items-center justify-center gap-1 rounded-md border border-yellow-600 bg-yellow-50 py-1 text-yellow-600 shadow-[0_0_10px_1px] shadow-yellow-600/20 transition duration-200 hover:bg-yellow-100 hover:shadow-yellow-600/40"
      >
        <span className="text-lg font-bold">100</span>
        <BiSolidCoinStack className="text-xl" />
      </button>
      <button
        onClick={() => handleBuy("diamonds")}
        className="flex w-3/4 items-center justify-center gap-1 rounded-md border border-purple-600 bg-purple-600 py-1 text-purple-50 shadow-[0_0_10px_1px] shadow-purple-600/30 transition duration-200 hover:border-purple-700 hover:bg-purple-700 hover:shadow-purple-600/60"
      >
        <span className="text-lg font-bold">25</span>
        <IoDiamond className="text-xl" />
      </button>
    </>
  );
}

export default AvatarStoreBuyButtons;

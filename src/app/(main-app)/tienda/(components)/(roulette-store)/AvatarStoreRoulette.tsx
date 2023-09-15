import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteBox from "./AvatarStoreRouletteBox";
import { cookies } from "next/headers";

const defaultAnimationTranslation = 1600;

async function AvatarStoreRoulette() {
  const [isGettingAvatars, setIsGettingAvatars] = useState(true);

  const supabase = createServerComponentClient({ cookies });

  if (!isGettingAvatars) return;

  const getUserAvatars = async () => {
    const { data: allAvatarsData, error: allAvatarsError } =
      await supabase.storage.from("avatar_images").list();

    if (allAvatarsError || !allAvatarsData) {
      console.error("There was an error getting all the avatars");
      return [];
    }

    const { data: userAvatarsData, error: userAvatarsError } = await supabase
      .from("user_avatars")
      .select("avatar_path");

    if (userAvatarsError || !userAvatarsData) {
      console.error("There was an error getting the user avatars");
      return [];
    }

    const allAvatarsPaths = allAvatarsData.map((avatarData) => avatarData.name);

    const remainingAvatarsPaths = allAvatarsPaths.filter((avatarPath) => {
      if (avatarPath === ".emptyFolderPlaceholder") {
        return false;
      } else if (
        userAvatarsData.find(
          (userAvatarData) => userAvatarData.avatar_path === avatarPath
        )
      ) {
        return false;
      } else {
        return true;
      }
    });

    return remainingAvatarsPaths;
  };

  const remainingAvatarsPaths = await getUserAvatars();

  while (remainingAvatarsPaths.length < 106) {
    remainingAvatarsPaths.push(...remainingAvatarsPaths);
  }
  shuffleArray(remainingAvatarsPaths);
  remainingAvatarsPaths.length = 106;

  const remainingAvatarsUrls = remainingAvatarsPaths.map((avatarPath: string) =>
    getAvatarImage(avatarPath)
  );

  setIsAnimationPlaying(false);
  setIsGettingAvatars(false);

  const randomTranslation = Math.random() * 16 - 8;

  const animationTranslation = defaultAnimationTranslation + randomTranslation;

  const selectedAvatarUrl = remainingAvatarsUrls[102];
  const selectedAvatarPath = remainingAvatarsPaths[102];

  const handleSpinRoulette = async (type: "coins" | "diamonds") => {
    if (isSpinningRoulette) return;
    setIsSpinningRoulette(true);

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
      console.error("There was an error selecting the user points");
      return;
    }

    if (type === "coins" && userPointsData.total_coins < 60) {
      console.error("You don't have enough coins to buy this");
      return;
    } else if (type === "diamonds" && userPointsData.total_diamonds < 15) {
      console.error("You don't have enough diamonds to buy this");
      return;
    }

    const { error: insertAvatarError } = await supabase
      .from("avatars_transactions")
      .insert({ user_id: userId, avatar_path: selectedAvatarPath.current });

    if (insertAvatarError) {
      console.error("There was an error inserting the avatar");
      return;
    }

    if (type === "coins") {
      const { error: insertCoinsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, coins: -60 });

      if (insertCoinsError) {
        console.error("There was an error inserting the coins");
      }
    } else if (type === "diamonds") {
      const { error: insertDiamondsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, diamonds: -15 });

      if (insertDiamondsError) {
        console.error("There was an error inserting the diamonds");
      }
    }
    router.refresh();

    setIsAnimationPlaying(true);

    setTimeout(() => {
      setShowAvatarModal(true);
      setIsSpinningRoulette(false);
    }, 10000);
  };

  const handleModalChange = () => {
    setShowAvatarModal((show) => {
      if (show) {
        setIsGettingAvatars(true);
      }
      return !show;
    });
  };

  return (
    <div className="mb-24 flex flex-col items-center justify-center">
      <h1 className="mb-6 text-7xl font-semibold tracking-tight text-emerald-950">
        ¡Gira la ruleta!
      </h1>
      <AvatarStoreRouletteBox>
        {avatarsUrls.map((item, index) => (
          <AvatarStoreRouletteItem key={index} index={index} data={item} />
        ))}
      </AvatarStoreRouletteBox>
    </div>
  );
}

export default AvatarStoreRoulette;

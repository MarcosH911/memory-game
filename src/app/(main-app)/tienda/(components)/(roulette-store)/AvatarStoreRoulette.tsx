"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";

const defaultAnimationTranslation = 1600;

function AvatarStoreRoulette() {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [avatarsUrls, setAvatarsUrls] = useState([""]);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isGettingAvatars, setIsGettingAvatars] = useState(true);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState(false);

  const animationTranslation = useRef(0);

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const selectedAvatarUrl = useRef("");
  const selectedAvatarPath = useRef("");

  useEffect(() => {
    if (!isGettingAvatars) return;

    const getRemainingAvatars = async () => {
      const userAvatarsResponse = await fetch("/api/avatars/user-avatars", {
        method: "get",
      });

      const { remainingAvatarsPaths } = await userAvatarsResponse.json();

      while (remainingAvatarsPaths.length < 106) {
        remainingAvatarsPaths.push(...remainingAvatarsPaths);
      }
      shuffleArray(remainingAvatarsPaths);
      remainingAvatarsPaths.length = 106;

      const remainingAvatarsUrls = remainingAvatarsPaths.map(
        (avatarPath: string) => getAvatarImage(avatarPath),
      );

      setAvatarsUrls(remainingAvatarsUrls);

      setIsAnimationPlaying(false);
      setIsGettingAvatars(false);

      const randomTranslation = Math.random() * 16 - 8;

      animationTranslation.current =
        defaultAnimationTranslation + randomTranslation;

      selectedAvatarUrl.current = remainingAvatarsUrls[102];
      selectedAvatarPath.current = remainingAvatarsPaths[102];
    };

    getRemainingAvatars();
  }, [isGettingAvatars, supabase]);

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
      <div className="relative">
        <div className="relative h-64 w-[80rem] overflow-hidden rounded-lg">
          <div
            style={
              isAnimationPlaying
                ? {
                    transform: `translateX(-${animationTranslation.current}rem)`,
                  }
                : {}
            }
            className={twMerge(
              "flex flex-row flex-nowrap items-center justify-start divide-x-2 rounded-lg divide-teal-50",
              isAnimationPlaying &&
                "transition duration-[10s] ease-[cubic-bezier(0.25,1,0.25,1)]",
            )}
          >
            {avatarsUrls.map((item, index) => (
              <AvatarStoreRouletteItem key={index} index={index} data={item} />
            ))}
          </div>
          <div>
            <div className="absolute left-1/2 top-0 z-20 h-full w-0.5 -translate-x-1/2 border-none bg-red-600 drop-shadow-[0_0_3px_rgba(255,0,0,1)]"></div>
            <div className="absolute bottom-0 left-1/2 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-b-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
            <div className="absolute left-1/2 top-0 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
          </div>
        </div>
        <AvatarStoreRouletteBuyButtons
          handleSpinRoulette={handleSpinRoulette}
        />
        <AvatarStoreRouletteModal
          handleModalChange={handleModalChange}
          selectedAvatarUrl={selectedAvatarUrl.current}
          showAvatarModal={showAvatarModal}
        />
      </div>
    </div>
  );
}

export default AvatarStoreRoulette;

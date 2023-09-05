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

  const animationTranslation = useRef(0);

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const selectedAvatarUrl = useRef("");
  const selectedAvatarPath = useRef("");

  useEffect(() => {
    if (!isGettingAvatars) return;

    const getRemainingAvatarsUrls = async () => {
      const { data: allAvatarsData, error: allAvatarsError } =
        await supabase.storage.from("avatar_images").list();

      if (allAvatarsError || !allAvatarsData) {
        console.error("There was an error getting all the avatars");
        return;
      }

      const { data: userAvatarsData, error: userAvatarsError } = await supabase
        .from("user_avatars")
        .select("avatar_path");

      if (userAvatarsError || !userAvatarsData) {
        console.error("There was an error getting the user avatars");
        return;
      }

      const allAvatarsPaths = allAvatarsData.map(
        (avatarData) => avatarData.name,
      );

      const remainingAvatarsPaths = allAvatarsPaths.filter((avatarPath) => {
        if (avatarPath === ".emptyFolderPlaceholder") {
          return false;
        } else if (
          userAvatarsData.find(
            (userAvatarData) => userAvatarData.avatar_path === avatarPath,
          )
        ) {
          return false;
        } else {
          return true;
        }
      });

      while (remainingAvatarsPaths.length < 100) {
        remainingAvatarsPaths.push(...remainingAvatarsPaths);
      }
      shuffleArray(remainingAvatarsPaths);
      remainingAvatarsPaths.length = 106;

      const remainingAvatarsUrls = remainingAvatarsPaths.map((avatarPath) =>
        getAvatarImage(avatarPath),
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

    getRemainingAvatarsUrls();
  }, [isGettingAvatars, supabase]);

  const handleSpinRoulette = async (type: "coins" | "diamonds") => {
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      console.error("Ha habido un error consiguiendo el usuario");
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

    if (type === "coins" && userPointsData.total_coins < 60) {
      console.error("No tienes suficientes monedas para comprar esto");
      return;
    } else if (type === "diamonds" && userPointsData.total_diamonds < 15) {
      console.error("No tienes suficientes diamantes para comprar esto");
      return;
    }

    const { error: insertAvatarError } = await supabase
      .from("avatars_transactions")
      .insert({ user_id: userId, avatar_path: selectedAvatarPath.current });

    if (insertAvatarError) {
      console.error("Ha habido un error insertando el avatar");
      return;
    }

    if (type === "coins") {
      const { error: insertCoinsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, coins: -60 });

      if (insertCoinsError) {
        console.error("Ha habido un error insertando las monedas");
      }
    } else if (type === "diamonds") {
      const { error: insertDiamondsError } = await supabase
        .from("points_transactions")
        .insert({ user_id: userId, diamonds: -15 });

      if (insertDiamondsError) {
        console.error("Ha habido un error insertando los diamantes");
      }
    }
    router.refresh();

    setIsAnimationPlaying(true);

    setTimeout(() => {
      setShowAvatarModal(true);
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
    <div className="h-[800px] flex items-center justify-center">
      <div className="relative">
        <div className="h-64 max-w-7xl overflow-hidden relative rounded-lg">
          <div
            style={
              isAnimationPlaying
                ? {
                    transform: `translateX(-${animationTranslation.current}rem)`,
                  }
                : {}
            }
            className={twMerge(
              "flex flex-row justify-start items-center flex-shrink-0 flex-nowrap rounded-lg divide-x-2",
              isAnimationPlaying &&
                `transition duration-[10s] ease-[cubic-bezier(0.25,1,0.25,1)]`,
            )}
          >
            {avatarsUrls.map((item, index) => (
              <AvatarStoreRouletteItem key={index} index={index} data={item} />
            ))}
          </div>
          <div className="absolute h-full w-0.5 bg-red-600 top-0 left-1/2 border-none -translate-x-1/2 z-20">
            <div className="absolute h-1 w-1 border-[1.25rem] border-transparent border-b-red-600 bottom-0 left-1/2 -translate-x-1/2"></div>
            <div className="absolute h-1 w-1 border-[1.25rem] border-transparent border-t-red-600 top-0 left-1/2 -translate-x-1/2"></div>
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

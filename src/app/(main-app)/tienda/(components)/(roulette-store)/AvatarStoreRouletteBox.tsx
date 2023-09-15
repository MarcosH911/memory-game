"use client";

import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";

interface Props {
  children: React.ReactNode;
  animationTranslation: number;
  selectedAvatarUrl: string;
  selectedAvatarPath: string;
}

function AvatarStoreRouletteBox({
  children,
  animationTranslation,
  selectedAvatarUrl,
  selectedAvatarPath,
}: Props) {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const isSpinningRoulette = useRef(false);

  const handleSpinRoulette = async (type: "coins" | "diamonds") => {
    if (isSpinningRoulette.current) return;
    isSpinningRoulette.current = true;

    const pointsDataResponse = await fetch("/api/points/user-points", {
      method: "get",
    });
    const pointsData = await pointsDataResponse.json();

    if (type === "coins" && pointsData.total_coins < 60) {
      console.error("You don't have enough coins to buy this");
      return;
    } else if (type === "diamonds" && pointsData.total_diamonds < 15) {
      console.error("You don't have enough diamonds to buy this");
      return;
    }

    fetch("/api/avatars/insert-avatar", {
      method: "post",
      body: JSON.stringify({ avatarPath: selectedAvatarPath }),
    });

    fetch("/api/points/insert-points", {
      method: "post",
      body: JSON.stringify({
        coins: type === "coins" ? -60 : 0,
        diamonds: type === "diamonds" ? -15 : 0,
      }),
    });

    setIsAnimationPlaying(true);

    setTimeout(() => {
      setShowAvatarModal(true);
      isSpinningRoulette.current = false;
    }, 10000);
  };

  return (
    <div className="relative">
      <div className="relative h-64 w-[80rem] overflow-hidden rounded-lg">
        <div
          style={
            isAnimationPlaying
              ? {
                  transform: `translateX(-${animationTranslation}rem)`,
                }
              : {}
          }
          className={twMerge(
            "flex flex-row flex-nowrap items-center justify-start divide-x-2 rounded-lg divide-teal-50",
            isAnimationPlaying &&
              "transition duration-[10s] ease-[cubic-bezier(0.25,1,0.25,1)]",
          )}
        >
          {children}
        </div>
        <div>
          <div className="absolute left-1/2 top-0 z-20 h-full w-0.5 -translate-x-1/2 border-none bg-red-600 drop-shadow-[0_0_3px_rgba(255,0,0,1)]"></div>
          <div className="absolute bottom-0 left-1/2 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-b-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
          <div className="absolute left-1/2 top-0 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
        </div>
      </div>
      <AvatarStoreRouletteBuyButtons handleSpinRoulette={handleSpinRoulette} />
      <AvatarStoreRouletteModal
        selectedAvatarUrl={selectedAvatarUrl}
        showAvatarModal={showAvatarModal}
        setShowAvatarModal={setShowAvatarModal}
        setIsAnimationPlaying={setIsAnimationPlaying}
      />
    </div>
  );
}

export default AvatarStoreRouletteBox;

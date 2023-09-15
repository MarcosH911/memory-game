"use client";

import { useRef, useState } from "react";

import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import { useRouter } from "next/navigation";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";

interface Props {
  avatarsUrls: string[];
  animationTranslation: number;
  selectedAvatarUrl: string;
  selectedAvatarPath: string;
}

function AvatarStoreRouletteBox({
  avatarsUrls,
  animationTranslation,
  selectedAvatarUrl,
  selectedAvatarPath,
}: Props) {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const rouletteItemsRef = useRef<HTMLDivElement | null>(null);
  const isSpinningRoulette = useRef(false);
  const currentSelectedAvatarUrl = useRef(selectedAvatarUrl);
  const currentAvatarsUrls = useRef<string[]>(avatarsUrls);

  const router = useRouter();

  const updateSelectedAvatarUrl = () => {
    currentSelectedAvatarUrl.current = selectedAvatarUrl;
  };

  const updateAvatarsUrls = () => {
    currentAvatarsUrls.current = avatarsUrls;
  };

  const handleAnimateRoulette = (type: "start" | "finish") => {
    if (type === "start") {
      rouletteItemsRef.current!.style.transition =
        "all 10s cubic-bezier(0.25, 1, 0.25, 1)";
      rouletteItemsRef.current!.style.transform = `translateX(-${animationTranslation}rem)`;
    } else if (type === "finish") {
      rouletteItemsRef.current!.style.transition = "none";
      rouletteItemsRef.current!.style.transform = `translateX(0)`;
    }
  };

  const handleSpinRoulette = async (type: "coins" | "diamonds") => {
    if (isSpinningRoulette.current) return;
    isSpinningRoulette.current = true;

    updateSelectedAvatarUrl();

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
    handleAnimateRoulette("start");

    router.refresh();

    // setTimeout(() => {
    //   setShowAvatarModal(true);
    //   isSpinningRoulette.current = false;
    // }, 10000);
  };

  return (
    <div className="relative">
      <div className="relative h-64 w-[80rem] overflow-hidden rounded-lg">
        <div
          ref={rouletteItemsRef}
          onTransitionEnd={() => {
            setShowAvatarModal(true);
            isSpinningRoulette.current = false;
          }}
          className="flex flex-row flex-nowrap items-center justify-start divide-x-2 rounded-lg"
        >
          {currentAvatarsUrls.current.map((item, index) => (
            <AvatarStoreRouletteItem key={index} index={index} data={item} />
          ))}
        </div>
        <div>
          <div className="absolute left-1/2 top-0 z-20 h-full w-0.5 -translate-x-1/2 border-none bg-red-600 drop-shadow-[0_0_3px_rgba(255,0,0,1)]"></div>
          <div className="absolute bottom-0 left-1/2 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-b-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
          <div className="absolute left-1/2 top-0 z-20 h-1 w-1 -translate-x-1/2 border-[1.25rem] border-transparent border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>
        </div>
      </div>
      <AvatarStoreRouletteBuyButtons handleSpinRoulette={handleSpinRoulette} />
      <AvatarStoreRouletteModal
        selectedAvatarUrl={currentSelectedAvatarUrl.current}
        showAvatarModal={showAvatarModal}
        setShowAvatarModal={setShowAvatarModal}
        setIsAnimationPlaying={setIsAnimationPlaying}
        updateAvatarsUrls={updateAvatarsUrls}
        handleAnimateRoulette={handleAnimateRoulette}
      />
    </div>
  );
}

export default AvatarStoreRouletteBox;

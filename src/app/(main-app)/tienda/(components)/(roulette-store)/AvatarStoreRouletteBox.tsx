"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";

interface Props {
  avatarsUrls: string[];
  animationTranslation: number;
  selectedAvatarUrl: string;
  selectedAvatarPath: string;
  hasEnoughCoins: boolean;
  hasEnoughDiamonds: boolean;
}

function AvatarStoreRouletteBox({
  avatarsUrls,
  animationTranslation,
  selectedAvatarUrl,
  selectedAvatarPath,
  hasEnoughCoins,
  hasEnoughDiamonds,
}: Props) {
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // TODO: router.refresh() reload avatar images

  const rouletteItemsRef = useRef<HTMLDivElement | null>(null);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState(false);
  const currentSelectedAvatarUrl = useRef(selectedAvatarUrl);
  const currentAvatarsUrls = useRef<string[]>(avatarsUrls);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSelectedAvatarUrl = useCallback(() => {
    currentSelectedAvatarUrl.current = selectedAvatarUrl;
  }, [selectedAvatarUrl]);

  const updateAvatarsUrls = useCallback(() => {
    currentAvatarsUrls.current = avatarsUrls;
  }, [avatarsUrls]);

  useEffect(() => {
    if (searchParams.has("hasBoughtAvatar", "true")) {
      updateSelectedAvatarUrl();
      updateAvatarsUrls();
      router.replace(pathname, { scroll: false });
    }
  }, [
    pathname,
    router,
    searchParams,
    updateAvatarsUrls,
    updateSelectedAvatarUrl,
  ]);

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
    if (isSpinningRoulette) return;
    setIsSpinningRoulette(true);

    updateSelectedAvatarUrl();

    const insertAvatarPromise = fetch("/api/avatars/insert-avatar", {
      method: "post",
      body: JSON.stringify({ avatarPath: selectedAvatarPath }),
    });

    const insertPointsPromise = fetch("/api/points/insert-points", {
      method: "post",
      body: JSON.stringify({
        coins: type === "coins" ? -60 : 0,
        diamonds: type === "diamonds" ? -15 : 0,
      }),
    });

    await Promise.all([insertAvatarPromise, insertPointsPromise]);

    handleAnimateRoulette("start");

    router.refresh();
  };

  return (
    <div className="relative">
      <div className="relative h-64 w-[80rem] overflow-hidden rounded-lg">
        <div
          ref={rouletteItemsRef}
          onTransitionEnd={() => {
            setShowAvatarModal(true);
            setIsSpinningRoulette(false);
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
      <AvatarStoreRouletteBuyButtons
        handleSpinRoulette={handleSpinRoulette}
        hasEnoughCoins={hasEnoughCoins}
        hasEnoughDiamonds={hasEnoughDiamonds}
        isSpinningRoulette={isSpinningRoulette}
      />
      <AvatarStoreRouletteModal
        selectedAvatarUrl={currentSelectedAvatarUrl.current}
        showAvatarModal={showAvatarModal}
        setShowAvatarModal={setShowAvatarModal}
        updateAvatarsUrls={updateAvatarsUrls}
        handleAnimateRoulette={handleAnimateRoulette}
      />
    </div>
  );
}

export default AvatarStoreRouletteBox;

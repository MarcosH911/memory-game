"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import AvatarStoreRouletteBuyButtons from "./AvatarStoreRouletteBuyButtons";
import AvatarStoreRouletteModal from "./AvatarStoreRouletteModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";
import sleep from "@/helpers/sleep";

interface Props {
  avatarsUrls: string[];
  selectedAvatarUrl: string;
  selectedAvatarPath: string;
  hasEnoughCoins: boolean;
  hasEnoughDiamonds: boolean;
}

function AvatarStoreRouletteBox({
  avatarsUrls,
  selectedAvatarUrl,
  selectedAvatarPath,
  hasEnoughCoins,
  hasEnoughDiamonds,
}: Props) {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isSpinningRoulette, setIsSpinningRoulette] = useState(false);

  const rouletteItemsRef = useRef<HTMLDivElement | null>(null);
  const currentSelectedAvatarUrl = useRef(selectedAvatarUrl);
  const currentAvatarsUrls = useRef<string[]>(avatarsUrls);
  const animationTranslation = useRef<number>(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateSelectedAvatarUrl = useCallback(() => {
    currentSelectedAvatarUrl.current = selectedAvatarUrl;
  }, [selectedAvatarUrl]);

  const updateAvatarsUrls = useCallback(() => {
    currentAvatarsUrls.current = avatarsUrls;
  }, [avatarsUrls]);

  const handleAnimateRoulette = (type: "start" | "finish") => {
    if (type === "start") {
      rouletteItemsRef.current!.style.transition =
        "all 10s cubic-bezier(0.25, 1, 0.25, 1)";
      rouletteItemsRef.current!.style.transform = `translateX(-${animationTranslation.current}rem)`;
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

  useEffect(() => {
    const viewportWidth = window.innerWidth || 0;
    let squareWidth = viewportWidth / 16 - 1;
    squareWidth /= viewportWidth < 768 ? 3 : 5;
    squareWidth = Math.min(squareWidth, 16);

    const defaultAnimationTranslation =
      squareWidth * (viewportWidth < 768 ? 101 : 100);
    const randomTranslation = ((Math.random() * 2 - 1) * squareWidth) / 2;

    animationTranslation.current =
      defaultAnimationTranslation + randomTranslation;
  }, []);

  return (
    <div className="relative">
      <div className="relative h-[calc((100vw-1rem)/3)] w-[calc(100vw-1rem)] overflow-hidden rounded-lg md:h-[calc((100vw-1rem)/5)] xl:h-64 xl:w-[80rem]">
        <div
          ref={rouletteItemsRef}
          onTransitionEnd={async () => {
            setShowAvatarModal(true);
            await sleep(600);
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
          <div className="absolute bottom-0 left-1/2 z-20 h-1 w-1 -translate-x-1/2 border-[0.75rem] border-transparent border-b-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] sm:border-[1.25rem]"></div>
          <div className="absolute left-1/2 top-0 z-20 h-1 w-1 -translate-x-1/2 border-[0.75rem] border-transparent border-t-red-600 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)] sm:border-[1.25rem]"></div>
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

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteBox from "./AvatarStoreRouletteBox";

const defaultAnimationTranslation = 1600;

interface Props {
  userAvatars: (string | null)[];
  userPoints: { coins: number; diamonds: number };
  allAvatars: string[];
}

async function AvatarStoreRoulette({
  userAvatars,
  userPoints,
  allAvatars,
}: Props) {
  const avatarPaths = allAvatars.filter(
    (avatarPath) => !userAvatars.includes(avatarPath),
  );

  while (avatarPaths.length < 106) {
    avatarPaths.push(...avatarPaths);
  }
  shuffleArray(avatarPaths);
  avatarPaths.length = 106;

  const avatarsUrls = avatarPaths.map((avatarPath: string) =>
    getAvatarImage(avatarPath),
  );

  const randomTranslation = Math.random() * 16 - 8;

  const animationTranslation = defaultAnimationTranslation + randomTranslation;

  const selectedAvatarUrl = avatarsUrls[102];
  const selectedAvatarPath = avatarPaths[102];

  const hasEnoughCoins = userPoints.coins >= 60;
  const hasEnoughDiamonds = userPoints.coins >= 15;

  return (
    <div className="mb-24 flex flex-col items-center justify-center">
      <h1 className="mb-6 text-7xl font-semibold tracking-tight text-emerald-950">
        ¡Gira la ruleta!
      </h1>
      <AvatarStoreRouletteBox
        avatarsUrls={avatarsUrls}
        animationTranslation={animationTranslation}
        selectedAvatarUrl={selectedAvatarUrl}
        selectedAvatarPath={selectedAvatarPath}
        hasEnoughCoins={hasEnoughCoins}
        hasEnoughDiamonds={hasEnoughDiamonds}
      />
    </div>
  );
}

export default AvatarStoreRoulette;

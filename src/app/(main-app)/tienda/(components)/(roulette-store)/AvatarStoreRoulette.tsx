import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteBox from "./AvatarStoreRouletteBox";

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

  const selectedAvatarUrl = avatarsUrls[102];
  const selectedAvatarPath = avatarPaths[102];

  const hasEnoughCoins = userPoints.coins >= 60;
  const hasEnoughDiamonds = userPoints.coins >= 15;

  return (
    <div className="mb-24 flex flex-col items-center justify-center">
      <h1 className="mb-6 text-4xl font-semibold tracking-tight text-emerald-950 xs:text-5xl sm:text-6xl lg:text-7xl">
        ¡Gira la ruleta!
      </h1>
      <AvatarStoreRouletteBox
        avatarsUrls={avatarsUrls}
        selectedAvatarUrl={selectedAvatarUrl}
        selectedAvatarPath={selectedAvatarPath}
        hasEnoughCoins={hasEnoughCoins}
        hasEnoughDiamonds={hasEnoughDiamonds}
      />
    </div>
  );
}

export default AvatarStoreRoulette;

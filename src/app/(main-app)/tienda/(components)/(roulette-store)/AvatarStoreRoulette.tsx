import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import shuffleArray from "@/helpers/shuffleArray";
import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreRouletteItem from "./AvatarStoreRouletteItem";
import AvatarStoreRouletteBox from "./AvatarStoreRouletteBox";

const defaultAnimationTranslation = 1600;

async function AvatarStoreRoulette() {
  const supabase = createServerComponentClient({ cookies });

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

    const avatarsPaths = allAvatarsPaths.filter((avatarPath) => {
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

    return avatarsPaths;
  };

  const avatarsPaths = await getUserAvatars();

  while (avatarsPaths.length < 106) {
    avatarsPaths.push(...avatarsPaths);
  }
  shuffleArray(avatarsPaths);
  avatarsPaths.length = 106;

  const avatarsUrls = avatarsPaths.map((avatarPath: string) =>
    getAvatarImage(avatarPath),
  );

  const randomTranslation = Math.random() * 16 - 8;

  const animationTranslation = defaultAnimationTranslation + randomTranslation;

  const selectedAvatarUrl = avatarsUrls[102];
  const selectedAvatarPath = avatarsPaths[102];

  return (
    <div className="mb-24 flex flex-col items-center justify-center">
      <h1 className="mb-6 text-7xl font-semibold tracking-tight text-emerald-950">
        ¡Gira la ruleta!
      </h1>
      <AvatarStoreRouletteBox
        animationTranslation={animationTranslation}
        selectedAvatarUrl={selectedAvatarUrl}
        selectedAvatarPath={selectedAvatarPath}
      >
        {avatarsUrls.map((item, index) => (
          <AvatarStoreRouletteItem key={index} index={index} data={item} />
        ))}
      </AvatarStoreRouletteBox>
    </div>
  );
}

export default AvatarStoreRoulette;

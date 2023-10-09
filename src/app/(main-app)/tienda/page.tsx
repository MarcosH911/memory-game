import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AvatarStore from "./(components)/(normal-store)/AvatarStore";
import AvatarStoreRoulette from "./(components)/(roulette-store)/AvatarStoreRoulette";

export const dynamic = "force-dynamic";

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const getUserPoints = async () => {
    const { data, error } = await supabase.from("user_points").select("*");

    if (error) {
      throw new Error();
    }

    let points = {
      coins: data?.[0].total_coins || 0,
      diamonds: data?.[0].total_diamonds || 0,
    };

    return points;
  };

  const getAvatarPaths = async () => {
    const { data, error } = await supabase.storage
      .from("avatar_images")
      .list("");

    if (error) {
      throw new Error();
    }

    const avatarPathsData = data.map((avatarData) => avatarData.name);

    const avatarPaths = avatarPathsData.filter((avatarPath) => {
      if (
        avatarPath === ".emptyFolderPlaceholder" ||
        avatarPath === "Default-Avatar.png"
      ) {
        return false;
      } else {
        return true;
      }
    });

    return avatarPaths;
  };

  const getUserAvatarPaths = async () => {
    const { data, error } = await supabase
      .from("user_avatars")
      .select("avatar_path");

    if (!data || error) {
      throw new Error();
    }

    const avatarPathsData = data.map((avatarData) => avatarData.avatar_path);

    const avatarsPaths = avatarPathsData.filter((avatarPath) => {
      if (
        avatarPath === ".emptyFolderPlaceholder" ||
        avatarPath === "Default-Avatar.png"
      ) {
        return false;
      } else {
        return true;
      }
    });

    return avatarsPaths;
  };

  const userPointsResponse = getUserPoints();
  const userAvatarsResponse = getUserAvatarPaths();
  const allAvatarsResponse = getAvatarPaths();

  const [userPoints, userAvatars, allAvatars] = await Promise.all([
    userPointsResponse,
    userAvatarsResponse,
    allAvatarsResponse,
  ]);

  if (!userPoints || !userAvatars || !allAvatars) {
    throw new Error();
  }

  return (
    <div className="py-8">
      <AvatarStoreRoulette
        userAvatars={userAvatars}
        userPoints={userPoints}
        allAvatars={allAvatars}
      />
      <AvatarStore
        userPoints={userPoints}
        userAvatars={userAvatars}
        allAvatars={allAvatars}
      />
    </div>
  );
}

export default Page;

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import AvatarStoreItem from "./AvatarStoreItem";
import { cookies } from "next/headers";

async function AvatarsStore() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.storage.from("avatar_images").list("");

  const { data: userAvatarsData } = await supabase
    .from("user_avatars")
    .select("avatar_path");

  if (!userAvatarsData) return null;

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-6 gap-8 px-8">
      {data?.map((item, index) => {
        if (
          item.name === ".emptyFolderPlaceholder" ||
          item.name === "Default-Avatar.png"
        ) {
          return null;
        }
        const userHasAvatar = !userAvatarsData.find(
          (avatar) => avatar.avatar_path === item.name,
        );

        return (
          <AvatarStoreItem
            key={index}
            data={item}
            userHasAvatar={userHasAvatar}
          />
        );
      })}
    </div>
  );
}

export default AvatarsStore;

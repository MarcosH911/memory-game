import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import AvatarStoreItem from "./AvatarStoreItem";

export const dynamic = "force-dynamic";

async function AvatarsStore() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data, error } = await supabase.storage.from("avatar_images").list("");

  const { data: userAvatarsData } = await supabase
    .from("user_avatars")
    .select("avatar_path");

  if (!userAvatarsData) return null;

  return (
    <div>
      <h1 className="mb-6 block text-center text-7xl font-semibold text-emerald-950">
        O compra tu favorito
      </h1>
      <div className="mx-auto grid max-w-7xl grid-cols-6 gap-8">
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
    </div>
  );
}

export default AvatarsStore;

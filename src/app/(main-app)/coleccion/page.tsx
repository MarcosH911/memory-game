import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AvatarCollectionItem from "./AvatarCollectionItem";

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) return null;

  const { data: userAvatarsData } = await supabase
    .from("user_avatars")
    .select("*");

  const { data: selectedAvatarData } = await supabase
    .from("profiles")
    .select("avatar_path")
    .eq("user_id", userId)
    .single();

  return (
    <div>
      {userAvatarsData && (
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-6 gap-y-10">
          {userAvatarsData.map((item, index) => (
            <AvatarCollectionItem
              key={index}
              data={item}
              isSelected={item.avatar_path === selectedAvatarData?.avatar_path}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;

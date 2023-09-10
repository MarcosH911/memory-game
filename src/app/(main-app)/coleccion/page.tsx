import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AvatarCollectionItem from "./AvatarCollectionItem";

export const dynamic = "force-dynamic";

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) return null;

  const { data: userAvatarsData, error: userAvatarsError } = await supabase
    .from("user_avatars")
    .select("*");

  if (userAvatarsError) {
    console.error("There was an error selecting the user avatars");
    return null;
  }

  const { data: selectedAvatarData, error: selectedAvatarError } =
    await supabase
      .from("profiles")
      .select("avatar_path")
      .eq("user_id", userId)
      .single();

  if (selectedAvatarError) {
    console.error("There was an error selecting the selected avatar");
    return null;
  }

  return (
    <div className="py-8 max-w-7xl mx-auto">
      <h1 className="text-7xl font-semibold text-teal-950 mb-4 text-center">
        Avatares ({userAvatarsData.length})
      </h1>
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {userAvatarsData.map((item, index) => (
          <AvatarCollectionItem
            key={index}
            data={item}
            isSelected={item.avatar_path === selectedAvatarData?.avatar_path}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;

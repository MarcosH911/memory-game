import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import CollectionAvatarItem from "./(components)/CollectionAvatarItem";

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
    <div className="mx-auto md:max-w-[60rem] xl:max-w-7xl py-8">
      <h1 className="mb-4 text-center text-6xl lg:text-7xl font-semibold text-teal-950">
        Avatares ({userAvatarsData.length})
      </h1>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 mx-8">
        {userAvatarsData.map((item, index) => (
          <CollectionAvatarItem
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

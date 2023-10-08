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
    <div className="mx-auto py-8 md:max-w-[60rem] xl:max-w-[80rem] xs:max-w-[40rem]">
      <h1 className="mb-8 text-center text-5xl font-semibold text-teal-950 lg:text-7xl xs:text-6xl">
        Avatares ({userAvatarsData.length})
      </h1>
      <div className="mx-3 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-3 xl:grid-cols-4 xs:mx-8 xs:gap-x-6 xs:gap-y-10">
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

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data: allAvatarsData, error: allAvatarsError } =
    await supabase.storage.from("avatar_images").list();

  if (allAvatarsError || !allAvatarsData) {
    console.error("There was an error getting all the avatars");
    return NextResponse.error();
  }

  const { data: userAvatarsData, error: userAvatarsError } = await supabase
    .from("user_avatars")
    .select("avatar_path");

  if (userAvatarsError || !userAvatarsData) {
    console.error("There was an error getting the user avatars");
    return NextResponse.error();
  }

  const allAvatarsPaths = allAvatarsData.map((avatarData) => avatarData.name);

  const remainingAvatarsPaths = allAvatarsPaths.filter((avatarPath) => {
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

  return NextResponse.json({ remainingAvatarsPaths }, { status: 200 });
}

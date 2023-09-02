import supabaseClient from "./supabaseClient";

function getAvatarImage(avatarPath: string | null) {
  const {
    data: { publicUrl: avatarUrl },
  } = supabaseClient.storage
    .from("avatar_images")
    .getPublicUrl(avatarPath || "Avatar-001.png");

  return avatarUrl;
}
export default getAvatarImage;

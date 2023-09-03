import supabaseClient from "./supabaseClient";

function getAvatarImage(avatarPath: string | null) {
  const {
    data: { publicUrl: avatarUrl },
  } = supabaseClient.storage
    .from("avatar_images")
    .getPublicUrl(avatarPath || "Default-Avatar.png");

  return avatarUrl;
}
export default getAvatarImage;

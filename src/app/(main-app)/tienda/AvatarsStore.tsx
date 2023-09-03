import supabaseClient from "@/utils/supabaseClient";
import AvatarStoreItem from "./AvatarStoreItem";

async function AvatarsStore() {
  const { data, error } = await supabaseClient.storage
    .from("avatar_images")
    .list("");

  return (
    <div className="grid grid-cols-6 max-w-7xl mx-auto gap-y-4 gap-x-8 px-8">
      {data?.map((item, index) => <AvatarStoreItem key={index} data={item} />)}
    </div>
  );
}

export default AvatarsStore;

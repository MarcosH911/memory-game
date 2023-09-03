import { FileObject } from "@supabase/storage-js";
import Image from "next/image";

import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreBuyButtons from "./AvatarStoreBuyButtons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface AvatarStoreItemProps {
  data: FileObject;
}

async function AvatarStoreItem({ data }: AvatarStoreItemProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  if (
    data.name === ".emptyFolderPlaceholder" ||
    data.name === "Default-Avatar.png"
  ) {
    return;
  }
  const imageUrl = getAvatarImage(data.name);

  const { data: userAvatarData } = await supabase
    .from("user_avatars")
    .select("*")
    .eq("avatar_path", data.name);

  const userHasAvatar = userAvatarData?.length === 0;

  return (
    <div className="flex items-center justify-center flex-col bg-teal-300 border shadow-xl rounded-lg py-6 transition group duration-300">
      <Image
        src={imageUrl}
        width={130}
        height={130}
        alt={data.name}
        className="border-4 border-teal-950 bg-teal-950 rounded-full mb-4 shadow-md transition duration-250 hover:scale-[1.15] hover:shadow-xl backface-hidden"
      />
      {userHasAvatar ? (
        <AvatarStoreBuyButtons avatarPath={data.name} />
      ) : (
        <span className="text-xl font-semibold py-7">Comprado</span>
      )}
    </div>
  );
}

export default AvatarStoreItem;

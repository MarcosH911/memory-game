import { FileObject } from "@supabase/storage-js";
import Image from "next/image";

import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreBuyButtons from "./AvatarStoreBuyButtons";

interface Props {
  data: FileObject;
  userHasAvatar: boolean;
}

async function AvatarStoreItem({ data, userHasAvatar }: Props) {
  const imageUrl = getAvatarImage(data.name);

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

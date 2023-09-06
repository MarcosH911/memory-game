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
    <div className="group flex flex-col items-center justify-center rounded-lg border bg-gradient-to-b from-yellow-100 to-teal-100 py-6 shadow-xl transition duration-300">
      <Image
        src={imageUrl}
        width={130}
        height={130}
        alt={data.name}
        className="mb-4 rounded-full border-4 border-slate-950 bg-slate-950 shadow-md transition duration-250 backface-hidden hover:scale-[1.15] hover:shadow-xl"
      />
      {userHasAvatar ? (
        <AvatarStoreBuyButtons avatarPath={data.name} />
      ) : (
        <span className="py-7 text-xl font-semibold">Comprado</span>
      )}
    </div>
  );
}

export default AvatarStoreItem;

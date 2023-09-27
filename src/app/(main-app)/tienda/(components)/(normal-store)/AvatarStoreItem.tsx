import Image from "next/image";

import getAvatarImage from "@/utils/getAvatarImage";
import AvatarStoreBuyButtons from "./AvatarStoreBuyButtons";

interface Props {
  avatarPath: string;
  userHasAvatar: boolean;
  userPoints: { coins: number; diamonds: number };
}

async function AvatarStoreItem({
  avatarPath,
  userHasAvatar,
  userPoints,
}: Props) {
  const imageUrl = getAvatarImage(avatarPath);

  return (
    <div className="group flex flex-col items-center justify-center rounded-lg border bg-gradient-to-b from-yellow-100 to-teal-100 py-6 shadow-xl transition duration-300">
      <div className="backface-hidden relative mb-4 h-28 w-28 rounded-full border-4 border-slate-950 bg-slate-950 shadow-md transition duration-250 hover:scale-[1.15] hover:shadow-xl xs:h-32 xs:w-32">
        <Image
          fill
          // TODO: sizes
          src={imageUrl}
          alt={"Avatar Image"}
        />
      </div>
      {!userHasAvatar ? (
        <AvatarStoreBuyButtons
          avatarPath={avatarPath}
          userPoints={userPoints}
        />
      ) : (
        <span className="py-7 text-xl font-semibold">Comprado</span>
      )}
    </div>
  );
}

export default AvatarStoreItem;

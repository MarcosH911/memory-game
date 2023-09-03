import { FileObject } from "@supabase/storage-js";
import Image from "next/image";

import getAvatarImage from "@/utils/getAvatarImage";
import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";

interface AvatarStoreItemProps {
  data: FileObject;
}

function AvatarStoreItem({ data }: AvatarStoreItemProps) {
  if (
    data.name === ".emptyFolderPlaceholder" ||
    data.name === "Default-Avatar.png"
  ) {
    return;
  }
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
      <button className="flex items-center justify-center bg-yellow-50 shadow-[0_0_10px_1px] shadow-yellow-600/20 text-yellow-600 w-3/4 gap-1 py-1 rounded-md border-yellow-600 border mb-2 hover:bg-yellow-100 hover:shadow-yellow-600/40 transition duration-200">
        <span className="font-bold text-lg">100</span>
        <BiSolidCoinStack className="text-xl" />
      </button>
      <button className="flex items-center justify-center shadow-[0_0_10px_1px] w-3/4 gap-1 py-1 rounded-md border-purple-600 border bg-purple-600 text-purple-50 shadow-purple-600/30 transition duration-200 hover:shadow-purple-600/60 hover:bg-purple-700 hover:border-purple-700">
        <span className="font-bold text-lg">25</span>
        <IoDiamond className="text-xl" />
      </button>
    </div>
  );
}

export default AvatarStoreItem;

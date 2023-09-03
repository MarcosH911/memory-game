import getAvatarImage from "@/utils/getAvatarImage";
import Image from "next/image";

interface AvatarCollectionItemProps {
  data: { avatar_path: string | null };
}

function AvatarCollectionItem({ data }: AvatarCollectionItemProps) {
  if (!data.avatar_path) return null;

  const avatarUrl = getAvatarImage(data.avatar_path);

  return (
    <div className="flex items-center justify-center p-6 rounded-2xl hover:bg-slate-300 hover:border-transparent hover:shadow-lg hover:duration-150 hover:delay-0 delay-200 duration-1000">
      <Image
        src={avatarUrl}
        height={260}
        width={260}
        alt="Avatar image"
        className="border-8 border-slate-950 bg-slate-950 rounded-full"
      />
    </div>
  );
}

export default AvatarCollectionItem;

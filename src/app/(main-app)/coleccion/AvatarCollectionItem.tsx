"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import getAvatarImage from "@/utils/getAvatarImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface AvatarCollectionItemProps {
  data: { avatar_path: string | null };
  isSelected: boolean;
  userId: string;
}

function AvatarCollectionItem({
  data,
  isSelected,
  userId,
}: AvatarCollectionItemProps) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  if (!data.avatar_path) return null;

  const avatarUrl = getAvatarImage(data.avatar_path);

  const handleAvatarSelect = async () => {
    if (isSelected || !data.avatar_path) return;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_path: data.avatar_path })
      .eq("user_id", userId);

    if (error) {
      console.error("Ha habido un error seleccionando el avatar");
      return;
    }

    router.refresh();
  };

  return (
    <div className="relative group">
      <button
        onClick={handleAvatarSelect}
        className={twMerge(
          "flex items-center justify-center border-4 border-transparent p-6 rounded-2xl group-hover:bg-slate-300 group-hover:shadow-lg group-hover:duration-150 group-hover:delay-0 duration-300",
          isSelected &&
            "border-teal-600 group-hover:border-teal-600 bg-teal-100 group-hover:bg-teal-300 group-hover:duration-150 transition duration-300",
        )}
      >
        <Image
          src={avatarUrl}
          height={260}
          width={260}
          alt="Avatar image"
          className="border-8 border-slate-950 bg-slate-950 rounded-full"
        />
      </button>
      <div
        className={twMerge(
          "uppercase font-semibold bg-teal-600 text-teal-50 absolute px-4 pb-2 pt-1 right-4 rounded-b-md group-hover:shadow-lg group-hover:duration-150 group-hover:delay-0 duration-300 tracking-wide opacity-0",
          isSelected && "opacity-100",
        )}
      >
        Seleccionado
      </div>
    </div>
  );
}

export default AvatarCollectionItem;

"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";

import getAvatarImage from "@/utils/getAvatarImage";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface Props {
  data: { avatar_path: string | null };
  isSelected: boolean;
  userId: string;
}

function CollectionAvatarItem({ data, isSelected, userId }: Props) {
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
      console.error("There was an error selecting the avatar");
      return;
    }

    router.refresh();
  };

  return (
    <div className="group relative">
      <button
        onClick={handleAvatarSelect}
        className={twMerge(
          "flex items-center justify-center rounded-2xl border-4 border-transparent p-6 duration-300 group-hover:bg-slate-300 group-hover:shadow-lg group-hover:delay-0 group-hover:duration-150",
          isSelected &&
            "border-teal-600 bg-teal-100 transition duration-300 group-hover:border-teal-600 group-hover:bg-teal-300 group-hover:duration-150",
        )}
      >
        <Image
          src={avatarUrl}
          alt="Avatar image"
          placeholder="blur"
          blurDataURL="/Default-Avatar.png"
          height={260}
          width={260}
          className="rounded-full border-8 border-slate-950 bg-slate-950"
        />
      </button>
      <div
        className={twMerge(
          "absolute right-4 rounded-b-md bg-teal-600 px-4 pb-2 pt-1 font-bold uppercase tracking-wider text-teal-50 opacity-0 duration-300 group-hover:shadow-lg group-hover:delay-0 group-hover:duration-150",
          isSelected && "opacity-100",
        )}
      >
        Seleccionado
      </div>
    </div>
  );
}

export default CollectionAvatarItem;

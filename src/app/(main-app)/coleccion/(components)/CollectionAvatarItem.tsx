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
          "flex items-center justify-center rounded-2xl border-[3px] border-transparent p-3 duration-300 group-hover:bg-slate-300 group-hover:shadow-lg group-hover:duration-150 xs:border-4 xs:p-4 lg:p-6",
          isSelected &&
            "border-teal-600 bg-teal-100 transition duration-300 group-hover:border-teal-600 group-hover:bg-teal-300 group-hover:duration-150",
        )}
      >
        <Image
          src={avatarUrl}
          alt="Avatar image"
          height={260}
          width={260}
          className="rounded-full border-4 border-slate-950 bg-slate-950 xs:border-[6px] lg:border-8"
        />
      </button>
      <div
        className={twMerge(
          "absolute right-4 hidden rounded-b-md bg-teal-600 px-2.5 pb-1 pt-0.5 text-sm font-bold uppercase tracking-wider text-teal-50 opacity-0 duration-300 group-hover:shadow-lg group-hover:duration-150 xs:block sm:px-4 sm:pb-2 sm:pt-1 sm:text-base",
          isSelected && "opacity-100",
        )}
      >
        Seleccionado
      </div>
    </div>
  );
}

export default CollectionAvatarItem;

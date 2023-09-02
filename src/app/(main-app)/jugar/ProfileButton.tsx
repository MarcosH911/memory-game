"use client";

import * as Popover from "@radix-ui/react-popover";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getAvatarImage from "@/utils/getAvatarImage";

function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  let avatarPath = null;

  useEffect(() => {
    const getAvatarPath = async () => {
      const avatarPath = supabase
        .from("profiles")
        .select("avatar_path")
        .eq("user_id", "auth.uid()")
        .single();
    };
    getAvatarPath;
  }, [supabase]);

  const avatarUrl = getAvatarImage(avatarPath);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("There was an error logging out");
    }

    router.refresh();
  };

  return (
    <div className="relative ml-2">
      <Popover.Root
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen((open) => !open)}
      >
        <Popover.Trigger asChild>
          <button>
            <Image
              src={avatarUrl}
              alt="profile-avatar"
              width={40}
              height={40}
            />
          </button>
        </Popover.Trigger>
        <Popover.Content asChild>
          <div className="z-30">
            <ul className="absolute flex flex-col z-30 bg-teal-50 w-40 -right-10 top-2 border rounded-lg justify-center items-start divide-y shadow-lg">
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="w-full py-2 px-4 hover:bg-slate-200 active:bg-slate-300 transition flex items-center justify-start gap-1 rounded-lg"
                >
                  <HiOutlineLogout className="text-lg" />
                  <span className="font-semibold">Cerrar sesión</span>
                </button>
              </li>
            </ul>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

export default ProfileButton;

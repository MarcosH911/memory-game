"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { HiOutlineLogout } from "react-icons/hi";

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
            <ul className="absolute -right-10 top-2 z-30 flex w-40 flex-col items-start justify-center divide-y rounded-lg border bg-teal-50 shadow-lg">
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-start gap-1 rounded-lg px-4 py-2 transition hover:bg-slate-200 active:bg-slate-300"
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

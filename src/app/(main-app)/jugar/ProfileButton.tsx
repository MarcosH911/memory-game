"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { HiOutlineLogout } from "react-icons/hi";

import getAvatarImage from "@/utils/getAvatarImage";
import { HiOutlineUser } from "react-icons/hi2";

function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const getUserData = async () => {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;

      if (!userId) return;

      const { data } = await supabase
        .from("profiles")
        .select("avatar_path, full_name")
        .eq("user_id", userId)
        .single();

      const avatarPath = data?.avatar_path;

      if (typeof avatarPath === "string") {
        setAvatarUrl(getAvatarImage(avatarPath));
      } else {
        setAvatarUrl(getAvatarImage("Default-Avatar.png"));
      }
      if (data) {
        setFullName(data?.full_name);
      }
    };

    getUserData();
  }, [supabase]);

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
            {avatarUrl && (
              <Image
                src={avatarUrl}
                alt="profile-avatar"
                width={40}
                height={40}
              />
            )}
          </button>
        </Popover.Trigger>
        <Popover.Content asChild>
          <div className="z-30">
            <ul className="absolute -right-10 top-2 flex w-56 flex-col items-start justify-center divide-y rounded-lg border bg-teal-50 shadow-lg">
              <li className="w-full flex items-center justify-start gap-1.5 rounded-lg px-4 py-2">
                <HiOutlineUser className="text-lg" />
                <span>{fullName}</span>
              </li>
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-start gap-1.5 rounded-b-lg px-4 py-2 transition hover:bg-slate-200 active:bg-slate-300"
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

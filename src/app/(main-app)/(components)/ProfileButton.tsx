"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import * as Popover from "@radix-ui/react-popover";
import { HiOutlineLogout } from "react-icons/hi";

import getAvatarImage from "@/utils/getAvatarImage";
import { HiOutlineUser } from "react-icons/hi2";
import Spinner from "@/components/Spinner";
import { twMerge } from "tailwind-merge";

function ProfileButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const profileDataResponse = await fetch("/api/profile/profile-data", {
        method: "get",
      });
      const { data: profileData } = await profileDataResponse.json();
      setAvatarUrl(getAvatarImage(profileData.avatar_path));
      setFullName(profileData.full_name);
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await fetch("/api/auth/logout", { method: "post" });
    if (response.status === 200) {
      router.replace("/iniciar-sesion");
      return;
    }
    setIsLoading(false);
  };

  return (
    <div className="relative ml-2 hidden sm:block">
      <Popover.Root
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen((open) => !open)}
      >
        <Popover.Trigger asChild>
          <button>
            <Image
              src={avatarUrl || "/Default-Avatar.png"}
              alt="Profile Avatar"
              width={40}
              height={40}
            />
          </button>
        </Popover.Trigger>
        <Popover.Content asChild>
          <div className="z-30">
            <ul className="absolute -right-10 top-2 flex w-56 flex-col items-start justify-center divide-y rounded-lg border bg-teal-50 shadow-lg">
              <li className="flex w-full items-center justify-start gap-1.5 rounded-lg px-4 py-2">
                <HiOutlineUser className="text-lg" />
                <span className="font-medium">{fullName}</span>
              </li>
              <li className="w-full">
                <button
                  onClick={handleLogout}
                  className="relative flex w-full items-center justify-start gap-1.5 rounded-b-lg px-4 py-2 transition hover:bg-slate-200 active:bg-slate-300"
                >
                  <Spinner visible={isLoading} size="2xl" />
                  <div
                    className={twMerge(
                      "visible flex items-center justify-start gap-1.5",
                      isLoading && "invisible",
                    )}
                  >
                    <HiOutlineLogout className="text-lg" />
                    <span className="font-bold">Cerrar sesión</span>
                  </div>
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

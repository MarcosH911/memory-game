"use client";

import * as Popover from "@radix-ui/react-popover";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function ProfileButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("There was an error logging out");
    }

    router.refresh();
  };

  return (
    <div className="relative ml-2">
      <Popover.Root defaultOpen={true}>
        <Popover.Trigger asChild>
          <button onClick={() => setIsModalOpen(true)}>
            <Image
              src="/profile-avatars/Avatar-001.png"
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
                  <span className="font-semibold">Logout</span>
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

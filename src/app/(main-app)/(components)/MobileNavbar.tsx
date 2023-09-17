"use client";

import getAvatarImage from "@/utils/getAvatarImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import MenuNavbar from "./MenuNavbar";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "post" });
    if (response.status === 200) {
      router.push("/iniciar-sesion");
    }
  };

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

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 flex items-center justify-center -ml-8"
      >
        {isOpen ? (
          <HiXMark className="text-4xl xs:text-5xl" />
        ) : (
          <HiBars3 className="text-4xl xs:text-5xl" />
        )}
      </button>
      <nav
        className={twMerge(
          "fixed left-0 top-0 translate-x-0 transition duration-300 h-screen bg-teal-50 z-40 px-6 py-28 w-full xs:w-fit",
          !isOpen && "-translate-x-full opacity-0",
        )}
      >
        <ul className="gap-6 flex-col items-start justify-center flex">
          <li className="flex items-center justify-start gap-3 pr-6">
            <Image
              src={avatarUrl || "/Default-Avatar.png"}
              alt="Profile image"
              height={50}
              width={50}
            />
            <span className="text-2xl font-semibold">{fullName}</span>
          </li>
          <hr className="border border-slate-300 w-full -mt-1 mb-1" />
          <MenuNavbar onClick={() => setIsOpen(false)} />
          <li
            onClick={handleLogout}
            className="flex items-center gap-1.5 border-transparent py-1 pr-2 text-lg font-semibold text-teal-950 transition hover:text-teal-600 cursor-pointer"
          >
            <HiOutlineLogout />
            <span>Cerrar sesión</span>
          </li>
        </ul>
      </nav>
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "w-full h-screen bg-black/30 fixed right-0 top-0 z-30 opacity-0 transition duration-300",
          isOpen && "opacity-100",
        )}
      ></div>
    </div>
  );
}

export default MobileNavbar;

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";

import getAvatarImage from "@/utils/getAvatarImage";
import MenuNavbar from "./MenuNavbar";

interface Props {
  avatarUrl: string;
  fullName: string;
}

function MobileNavbar({ avatarUrl, fullName }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/auth/logout", { method: "post" });
    if (response.status === 200) {
      router.push("/iniciar-sesion");
    }
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="relative z-50 -ml-8 flex items-center justify-center"
      >
        {isOpen ? (
          <HiXMark className="text-4xl xs:text-5xl" />
        ) : (
          <HiBars3 className="text-4xl xs:text-5xl" />
        )}
      </button>
      <nav
        className={twMerge(
          "fixed left-0 top-0 z-40 h-screen w-full translate-x-0 bg-teal-50 px-6 py-28 transition duration-300 xs:w-fit",
          !isOpen && "-translate-x-full opacity-0",
        )}
      >
        <ul className="flex flex-col items-start justify-center gap-6">
          <li className="flex items-center justify-start gap-3 pr-6">
            <Image
              src={avatarUrl || "/Default-Avatar.png"}
              alt="Profile image"
              height={50}
              width={50}
            />
            <span className="text-2xl font-semibold">{fullName}</span>
          </li>
          <hr className="-mt-1 mb-1 w-full border border-slate-300" />
          <MenuNavbar onClick={() => setIsOpen(false)} />
          <li
            onClick={handleLogout}
            className="flex cursor-pointer items-center gap-1.5 border-transparent py-1 pr-2 text-lg font-semibold text-teal-950 transition hover:text-teal-600"
          >
            <HiOutlineLogout />
            <span>Cerrar sesión</span>
          </li>
        </ul>
      </nav>
      <div
        onClick={() => setIsOpen(false)}
        className={twMerge(
          "invisible fixed right-0 top-0 z-30 h-screen w-full bg-black/30 opacity-0 transition-all duration-300",
          isOpen && "visible opacity-100",
        )}
      ></div>
    </div>
  );
}

export default MobileNavbar;

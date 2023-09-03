"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlinePlay,
  HiOutlineShoppingBag,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function MenuNavbar() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-6">
      <Link href="/jugar">
        <li
          className={twMerge(
            "flex items-center gap-1 border-b-2 border-transparent py-1 pl-2 pr-3 text-lg font-semibold text-teal-950 transition hover:text-teal-600",
            pathname === "/jugar" && "border-teal-950 hover:border-teal-600",
          )}
        >
          <HiOutlinePlay />
          <span>Jugar</span>
        </li>
      </Link>
      <Link href="/ranking">
        <li
          className={twMerge(
            "flex items-center gap-1.5 border-b-2 border-transparent py-1 pl-2 pr-3 text-lg font-semibold text-teal-950 transition hover:text-teal-600",
            pathname === "/ranking" && "border-teal-950 hover:border-teal-600",
          )}
        >
          <MdOutlineLeaderboard />
          <span>Ranking</span>
        </li>
      </Link>
      <Link href="/tienda">
        <li
          className={twMerge(
            "flex items-center gap-1.5 border-b-2 border-transparent py-1 pl-2 pr-3 text-lg font-semibold text-teal-950 transition hover:text-teal-600",
            pathname === "/tienda" && "border-teal-950 hover:border-teal-600",
          )}
        >
          <HiOutlineShoppingCart />
          <span>Tienda</span>
        </li>
      </Link>
      <Link href="/coleccion">
        <li
          className={twMerge(
            "flex items-center gap-1.5 border-b-2 border-transparent py-1 pl-2 pr-3 text-lg font-semibold text-teal-950 transition hover:text-teal-600",
            pathname === "/coleccion" &&
              "border-teal-950 hover:border-teal-600",
          )}
        >
          <HiOutlineShoppingBag />
          <span>Colección</span>
        </li>
      </Link>
    </ul>
  );
}

export default MenuNavbar;

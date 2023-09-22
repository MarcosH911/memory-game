"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import setSearchParams from "@/helpers/setSearchParams";

interface Props {
  itemType: string;
  index?: number;
}

function RankingFiltersPointsItem({ itemType, index }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rankingType = searchParams.get("pointsFilter") || "coins";

  return (
    <Link
      href={setSearchParams(pathname, searchParams, [
        ["pointsFilter", itemType],
      ])}
    >
      <li>
        <button
          className={twMerge(
            "flex items-center gap-0.5 xs:gap-1 sm:gap-1.5 rounded-full sm:px-6 sm:py-3 px-1.5 xs:px-3 py-2 text-yellow-600 transition duration-200 hover:bg-slate-300 hover:shadow-md sm:text-base text-sm",
            index === 0 && "pl-2",
            index === 2 && "pr-2",
            itemType === "coins" && "text-yellow-600",
            itemType === "diamonds" && "text-purple-600",
            itemType === "max_level" && "text-green-600",
            rankingType === itemType && "shadow-md hover:border-transparent",
            rankingType === "coins" &&
              itemType === "coins" &&
              "bg-yellow-600 text-yellow-50 hover:bg-yellow-600",
            rankingType === "diamonds" &&
              itemType === "diamonds" &&
              "bg-purple-600 text-purple-50 hover:bg-purple-600",
            rankingType === "max_level" &&
              itemType === "max_level" &&
              "bg-green-600 text-blue-50 hover:bg-green-600",
          )}
        >
          {itemType === "coins" && <BiSolidCoinStack />}
          {itemType === "diamonds" && <IoDiamond />}
          {itemType === "max_level" && <FaLevelUpAlt />}

          <span className="font-bold">
            {itemType === "coins" && "Monedas"}
            {itemType === "diamonds" && "Diamantes"}
            {itemType === "max_level" && "Máximo nivel"}
          </span>
        </button>
      </li>
    </Link>
  );
}

export default RankingFiltersPointsItem;

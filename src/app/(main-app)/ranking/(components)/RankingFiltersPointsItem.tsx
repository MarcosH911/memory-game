"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaLevelUpAlt } from "react-icons/fa";
import { IoDiamond } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

interface Props {
  itemType: string;
}

function RankingFiltersPointsItem({ itemType }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rankingType = searchParams.get("pointsFilter") || "coins";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <Link href={pathname + "?" + createQueryString("pointsFilter", itemType)}>
      <li>
        <button
          className={twMerge(
            "flex items-center gap-1.5 rounded-full px-6 py-3 text-yellow-600 transition duration-200 hover:bg-slate-300 hover:shadow-md",
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

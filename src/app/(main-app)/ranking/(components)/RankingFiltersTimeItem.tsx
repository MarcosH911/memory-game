"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  itemType: string;
}

function RankingFiltersTimeItem({ itemType }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rankingType = searchParams.get("timeFilter") || "day";

  const getQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  return (
    <div>
      <Link href={pathname + "?" + getQueryString("timeFilter", itemType)}>
        <li>
          <button
            className={twMerge(
              "rounded-full px-5 py-3 font-semibold text-slate-950 transition duration-200 hover:bg-slate-300 hover:shadow-md",
              rankingType === itemType &&
                "bg-slate-600 text-slate-50 shadow-md hover:bg-slate-600 hover:text-slate-50",
            )}
          >
            {itemType === "day" && "Día"}
            {itemType === "week" && "Semana"}
            {itemType === "month" && "Mes"}
            {itemType === "year" && "Año"}
            {itemType === "all_time" && "Todo el tiempo"}
          </button>
        </li>
      </Link>
    </div>
  );
}

export default RankingFiltersTimeItem;

"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

import setSearchParams from "@/helpers/setSearchParams";

interface Props {
  itemType: string;
  timeFilter: string;
  setTimeFilter: React.Dispatch<React.SetStateAction<string>>;
  index?: number;
}

function TeacherFiltersTimeItem({
  itemType,
  timeFilter,
  setTimeFilter,
  index,
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rankingType = searchParams.get("timeFilter") || "day";

  return (
    <li onClick={() => setTimeFilter(itemType)}>
      <button
        className={twMerge(
          "rounded-full px-2 py-1.5 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-slate-300 hover:shadow-md xs:px-3 sm:px-5 sm:py-3 sm:text-base",
          timeFilter === itemType &&
            "bg-slate-600 text-slate-50 shadow-md hover:bg-slate-600 hover:text-slate-50",
          index === 0 && "pl-2.5",
          index === 4 && "pr-2.5",
        )}
      >
        {itemType === "day" && "Día"}
        {itemType === "week" && "Semana"}
        {itemType === "month" && "Mes"}
        {itemType === "year" && "Año"}
        {itemType === "all_time" && "Todo el tiempo"}
      </button>
    </li>
  );
}

export default TeacherFiltersTimeItem;

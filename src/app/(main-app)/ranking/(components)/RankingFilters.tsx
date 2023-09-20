import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import RankingFiltersPointsItem from "./RankingFiltersPointsItem";
import RankingFiltersTimeItem from "./RankingFiltersTimeItem";

const allRankingViews = ["day", "week", "month", "year", "all_time"];

function RankingFilters() {
  return (
    <div className="relative mb-3 flex items-center justify-between">
      <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        {allRankingViews.map((itemType, index) => (
          <RankingFiltersTimeItem key={index} itemType={itemType} />
        ))}
      </ul>

      <button className="flex items-center justify-center gap-1.5 rounded-full border border-slate-400/70 bg-slate-200 px-10 py-3 font-semibold text-slate-950 shadow-md transition duration-200 hover:bg-slate-300 hover:shadow-lg">
        <HiAdjustmentsHorizontal className="text-xl" />
        <span>Filtros avanzados</span>
      </button>

      <ul className="relative flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        {["coins", "diamonds", "max_level"].map((itemType, index) => (
          <RankingFiltersPointsItem key={index} itemType={itemType} />
        ))}
      </ul>
    </div>
  );
}

export default RankingFilters;

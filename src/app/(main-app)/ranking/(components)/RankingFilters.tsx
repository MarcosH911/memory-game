import RankingFiltersPointsItem from "./RankingFiltersPointsItem";
import RankingFiltersTimeItem from "./RankingFiltersTimeItem";

const allRankingViews = ["day", "week", "month", "year", "all_time"];

function RankingFilters() {
  return (
    <div className="relative mb-6 flex items-center justify-between">
      <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        {allRankingViews.map((itemType, index) => (
          <RankingFiltersTimeItem key={index} itemType={itemType} />
        ))}
      </ul>

      <ul className="relative flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        {["coins", "diamonds", "max_level"].map((itemType, index) => (
          <RankingFiltersPointsItem key={index} itemType={itemType} />
        ))}
      </ul>
    </div>
  );
}

export default RankingFilters;

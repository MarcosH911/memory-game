import RankingFiltersPointsItem from "./RankingFiltersPointsItem";
import RankingFiltersTimeItem from "./RankingFiltersTimeItem";
import RankingFiltersModal from "./RankingFiltersModal";

const allRankingViews = ["day", "week", "month", "year", "all_time"];

function RankingFilters() {
  return (
    <>
      <RankingFiltersModal />
      <div className="relative mb-4 mt-8 hidden items-center justify-between xl:flex xl:flex-row">
        <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
          {allRankingViews.map((itemType, index) => (
            <RankingFiltersTimeItem key={index} itemType={itemType} />
          ))}
        </ul>

        <RankingFiltersModal type="advanced" />

        <ul className="relative flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
          {["coins", "diamonds", "max_level"].map((itemType, index) => (
            <RankingFiltersPointsItem key={index} itemType={itemType} />
          ))}
        </ul>
      </div>
    </>
  );
}

export default RankingFilters;

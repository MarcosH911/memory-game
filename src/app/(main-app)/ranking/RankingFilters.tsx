import { twMerge } from "tailwind-merge";
import { IoDiamond } from "react-icons/io5";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaLevelUpAlt } from "react-icons/fa";

import RankingViewButton from "./RankingViewButton";

type rankingViewType =
  | "points_ranking_day"
  | "points_ranking_week"
  | "points_ranking_month"
  | "points_ranking_year"
  | "points_ranking_all_time";

type rankingTypeType = "coins" | "diamonds" | "max_level";

interface RankingFiltersProps {
  rankingView: rankingViewType;
  rankingType: rankingTypeType;
  setRankingView: React.Dispatch<React.SetStateAction<rankingViewType>>;
  setRankingType: React.Dispatch<React.SetStateAction<rankingTypeType>>;
}

const allRankingViews = [
  { view: "points_ranking_day", text: "Día" },
  { view: "points_ranking_week", text: "Semana" },
  { view: "points_ranking_month", text: "Mes" },
  { view: "points_ranking_year", text: "Año" },
  { view: "points_ranking_all_time", text: "Todo el tiempo" },
];

function RankingFilters({
  rankingView,
  rankingType,
  setRankingView,
  setRankingType,
}: RankingFiltersProps) {
  return (
    <div className="relative mb-6 flex items-center justify-between">
      <ul className="flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        {allRankingViews.map(({ view, text }, index) => (
          <RankingViewButton
            key={index}
            active={rankingView === view}
            view={view as rankingViewType}
            setRankingView={setRankingView}
            text={text}
          />
        ))}
      </ul>

      <h1 className="absolute left-1/2 top-1/2 -mt-6 -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold text-teal-800">
        Ranking
      </h1>

      <ul className="relative flex rounded-full bg-slate-200 shadow-inner shadow-slate-950/20">
        <li>
          <button
            onClick={() => setRankingType("coins")}
            className={twMerge(
              "flex items-center gap-1.5 rounded-full px-6 py-3 font-semibold text-yellow-600 transition duration-200 hover:bg-slate-300 hover:shadow-md",
              rankingType === "coins" &&
                "bg-yellow-600 text-yellow-50 shadow-md hover:border-transparent hover:bg-yellow-600",
            )}
          >
            <BiSolidCoinStack />
            <span>Monedas</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setRankingType("diamonds")}
            className={twMerge(
              "flex items-center gap-1.5 rounded-full px-6 py-3 font-semibold text-purple-600 transition duration-200 hover:bg-slate-300 hover:shadow-md",
              rankingType === "diamonds" &&
                "bg-purple-600 text-purple-50 shadow-md hover:border-transparent hover:bg-purple-600",
            )}
          >
            <IoDiamond />
            <span>Diamantes</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setRankingType("max_level")}
            className={twMerge(
              "flex items-center gap-1.5 rounded-full px-6 py-3 font-semibold text-green-600 transition duration-200 hover:bg-slate-300 hover:shadow-md",
              rankingType === "max_level" &&
                "bg-green-600 text-green-50 shadow-md hover:border-transparent hover:bg-green-600",
            )}
          >
            <FaLevelUpAlt />
            <span>Máximo nivel</span>
          </button>
        </li>
        <li>
          <div className="absolute bg-red-500"></div>
        </li>
      </ul>
    </div>
  );
}

export default RankingFilters;

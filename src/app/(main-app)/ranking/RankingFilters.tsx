import { twMerge } from "tailwind-merge";
import RankingViewButton from "./RankingViewButton";
import { IoDiamond } from "react-icons/io5";
import { BiSolidCoinStack } from "react-icons/bi";
import { FaLevelUpAlt } from "react-icons/fa";

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
    <div className="flex justify-between items-center relative mb-6">
      <ul className="bg-slate-200 shadow-inner shadow-slate-950/20 flex rounded-full">
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

      <h1 className="text-5xl -mt-6 font-semibold text-teal-800 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Ranking
      </h1>

      <ul className="flex bg-slate-200 rounded-full relative shadow-inner shadow-slate-950/20">
        <li>
          <button
            onClick={() => setRankingType("coins")}
            className={twMerge(
              "rounded-full py-3 px-6 transition duration-200 hover:shadow-md hover:bg-slate-300 text-yellow-600 font-semibold flex gap-1.5 items-center",
              rankingType === "coins" &&
                "bg-yellow-600 text-yellow-50 hover:border-transparent hover:bg-yellow-600 shadow-md",
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
              "rounded-full py-3 px-6 transition duration-200 hover:shadow-md hover:bg-slate-300 flex items-center gap-1.5 text-purple-600 font-semibold",
              rankingType === "diamonds" &&
                "bg-purple-600 text-purple-50 hover:border-transparent hover:bg-purple-600 shadow-md",
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
              "rounded-full py-3 px-6 transition duration-200 hover:shadow-md hover:bg-slate-300 text-green-600 font-semibold flex items-center gap-1.5",
              rankingType === "max_level" &&
                "bg-green-600 text-green-50 hover:border-transparent hover:bg-green-600 shadow-md",
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

import { twMerge } from "tailwind-merge";

type rankingViewType =
  | "points_ranking_day"
  | "points_ranking_week"
  | "points_ranking_month"
  | "points_ranking_year"
  | "points_ranking_all_time";

interface Props {
  setRankingView: React.Dispatch<React.SetStateAction<rankingViewType>>;
  view: rankingViewType;
  text: string;
  active: boolean;
}

function RankingViewButton({ setRankingView, view, text, active }: Props) {
  return (
    <div>
      <li>
        <button
          onClick={() => setRankingView(view)}
          className={twMerge(
            "rounded-full px-4 py-2 text-sm text-slate-950 transition duration-200 hover:bg-slate-300 hover:shadow-md",
            active &&
              "bg-slate-600 text-slate-50 shadow-md hover:bg-slate-600 hover:text-slate-50",
          )}
        >
          {text}
        </button>
      </li>
    </div>
  );
}

export default RankingViewButton;

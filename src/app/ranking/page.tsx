"use client";

import RankingTable from "@/components/RankingTable";
import { getRanking } from "@/utils/getRanking";
import { useEffect, useState } from "react";
import { Database } from "../../../types/supabase";

type dataType = Database["public"]["Views"]["points_ranking_all_time"]["Row"][];

type rankingViewType =
  | "points_ranking_day"
  | "points_ranking_week"
  | "points_ranking_month"
  | "points_ranking_year"
  | "points_ranking_all_time";

type rankingTypeType = "coins" | "diamonds" | "max_level";

function Page() {
  const [data, setData] = useState<dataType | null>(null);
  const [rankingView, setRankingView] = useState<rankingViewType>(
    "points_ranking_all_time",
  );
  const [rankingType, setRankingType] = useState<rankingTypeType>("coins");

  useEffect(() => {
    const getData = async () => {
      const { data: fetchedData } = await getRanking(rankingView, rankingType);
      setData(fetchedData);
    };

    getData();
  }, [rankingView, rankingType]);

  return (
    <div>
      <div>
        <button onClick={() => setRankingView("points_ranking_day")}>
          Día
        </button>
        <button onClick={() => setRankingView("points_ranking_week")}>
          Semana
        </button>
        <button onClick={() => setRankingView("points_ranking_month")}>
          Mes
        </button>
        <button onClick={() => setRankingView("points_ranking_year")}>
          Año
        </button>
        <button onClick={() => setRankingView("points_ranking_all_time")}>
          Todo el tiempo
        </button>
      </div>
      <div>
        <button onClick={() => setRankingType("coins")}>Monedas</button>
        <button onClick={() => setRankingType("diamonds")}>Diamantes</button>
        <button onClick={() => setRankingType("max_level")}>
          Máximo nivel
        </button>
      </div>
      {data && (
        <RankingTable data={data} title="Ranking diario" type={rankingType} />
      )}
    </div>
  );
}

export default Page;

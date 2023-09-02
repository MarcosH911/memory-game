"use client";

import { getRanking } from "@/utils/getRanking";
import { useEffect, useState } from "react";
import RankingFilters from "./RankingFilters";
import RankingTable from "./RankingTable";

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
  const [isReloading, setIsReloading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data: fetchedData } = await getRanking(rankingView, rankingType);
      setData(fetchedData);
      setIsReloading(false);
    };

    getData();
  }, [rankingView, rankingType, isReloading]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-[80rem]">
        <RankingFilters
          rankingView={rankingView}
          rankingType={rankingType}
          setRankingView={setRankingView}
          setRankingType={setRankingType}
        />
        {data && (
          <RankingTable
            data={data}
            type={rankingType}
            isReloading={isReloading}
            setIsReloading={setIsReloading}
          />
        )}
      </div>
    </div>
  );
}

export default Page;

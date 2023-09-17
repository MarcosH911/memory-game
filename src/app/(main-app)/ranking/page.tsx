import { Suspense } from "react";

import supabaseClient from "@/utils/supabaseClient";
import RankingFilters from "./(components)/RankingFilters";
import RankingTable from "./(components)/RankingTable";
import RankingFiltersLoading from "./(components)/RankingFiltersLoading";
import RankingTableLoading from "./(components)/RankingTableLoading";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: Props) {
  const timeFilter = `points_ranking_${
    (searchParams.timeFilter as string) || "day"
  }`;
  const pointsFilter = (searchParams.pointsFilter as string) || "coins";

  const { data, error } = await supabaseClient
    .from(timeFilter)
    .select("*")
    .order(pointsFilter, {
      ascending: false,
    });

  if (error) {
    console.error(error);
  }

  return (
    <div className="flex h-full justify-center">
      <div className="w-[80rem]">
        <h1 className="-mb-6 mt-8 text-center text-7xl font-semibold text-teal-800">
          Ranking
        </h1>

        <Suspense fallback={<RankingFiltersLoading />}>
          <RankingFilters />
        </Suspense>
        <Suspense fallback={<RankingTableLoading />}>
          <RankingTable data={data} pointsFilter={pointsFilter} />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;

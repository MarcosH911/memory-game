import { Suspense } from "react";

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
  const schoolFilter = searchParams.schoolFilter as string;
  const stageFilter = searchParams.stageFilter as string;
  const gradeFilter = searchParams.gradeFilter as string;
  const classFilter = searchParams.classFilter as string;

  return (
    <div className="flex h-full justify-center">
      <div className="w-full xl:w-[80rem] mx-4">
        <Suspense fallback={<RankingFiltersLoading />}>
          <RankingFilters />
        </Suspense>
        <Suspense fallback={<RankingTableLoading />}>
          {/* <RankingTable
            timeFilter={timeFilter}
            pointsFilter={pointsFilter}
            schoolFilter={schoolFilter}
            stageFilter={stageFilter}
            gradeFilter={gradeFilter}
            classFilter={classFilter}
          /> */}
        </Suspense>
      </div>
    </div>
  );
}

export default Page;

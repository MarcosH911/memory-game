import { getRanking } from "@/utils/getRanking";
import RankingFilters from "./(components)/RankingFilters";
import RankingTable from "./(components)/RankingTable";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function Page({ searchParams }: Props) {
  const { data } = await getRanking(
    (searchParams.timeFilter as string) || "day",
    (searchParams.pointsFilter as string) || "coins",
  );

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-[80rem]">
        <h1 className="mb-4 text-center text-7xl font-semibold text-teal-800">
          Ranking
        </h1>
        <RankingFilters />
        <RankingTable
          data={data}
          pointsFilter={searchParams.pointsFilter as string}
        />
      </div>
    </div>
  );
}

export default Page;

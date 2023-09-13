import RankingFilters from "./(components)/RankingFilters";
import RankingTable from "./(components)/RankingTable";
import supabaseClient from "@/utils/supabaseClient";

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
        <h1 className="mt-8 text-center text-7xl font-semibold text-teal-800">
          Ranking
        </h1>
        <RankingFilters />
        <RankingTable data={data} pointsFilter={pointsFilter} />
      </div>
    </div>
  );
}

export default Page;

import RankingTable from "@/components/RankingTable";
import { getDailyRanking } from "@/utils/getDailyRanking";

export const dynamic = "force-dynamic";

async function Page() {
  const { data, error } = await getDailyRanking();

  return (
    <div>{data && <RankingTable data={data} title="Ranking diario" />}</div>
  );
}

export default Page;

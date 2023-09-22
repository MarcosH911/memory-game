import supabaseClient from "@/utils/supabaseClient";
import RankingRow from "./RankingRow";
import RakingTableReloadButton from "./RankingTableReloadButton";

export const revalidate = 20;

interface Props {
  pointsFilter: string;
  timeFilter: string;
  schoolFilter: string;
  stageFilter: string;
  gradeFilter: string;
  classFilter: string;
}

async function RankingTable({
  timeFilter,
  pointsFilter,
  schoolFilter,
  stageFilter,
  gradeFilter,
  classFilter,
}: Props) {
  const advancedFilters: {
    school?: string;
    stage?: string;
    grade?: string;
    class?: string;
  } = {};

  if (schoolFilter) {
    advancedFilters.school = schoolFilter;
  }
  if (stageFilter) {
    advancedFilters.stage = stageFilter;
  }
  if (gradeFilter) {
    advancedFilters.grade = gradeFilter;
  }
  if (classFilter) {
    advancedFilters.class = classFilter;
  }

  const { data, error } = await supabaseClient
    .from(timeFilter)
    .select("*")
    .match(advancedFilters)
    .order(pointsFilter, {
      ascending: false,
    });

  if (error) {
    console.error(error);
  }

  return (
    <div className="relative rounded-lg shadow-xl">
      <RakingTableReloadButton finishedReloading={true} />
      <table className="w-full">
        <thead>
          <tr className="flex h-16 items-center justify-around rounded-t-lg bg-teal-700 px-24 text-teal-50 shadow-xl">
            <th className="flex w-[25%] items-center justify-center text-lg font-bold">
              Posición
            </th>
            <th className="flex w-[25%] items-center justify-center text-lg font-bold">
              Avatar
            </th>
            <th className="flex w-[25%] items-center justify-center text-lg font-bold">
              Nombre
            </th>
            <th className="flex w-[25%] items-center justify-center text-lg font-bold">
              {pointsFilter === "coins" && "Monedas"}
              {pointsFilter === "diamonds" && "Diamantes"}
              {pointsFilter === "max_level" && "Máximo nivel"}
            </th>
          </tr>
        </thead>
      </table>

      <div className="scrollbar-ranking 2xl:h-[calc(100vh-18rem)] h-[calc(100vh-16rem)] overflow-y-auto rounded-b-lg">
        <table className="w-full rounded-lg">
          <tbody className="h-full rounded-lg">
            {data?.map((item, index) => (
              <RankingRow
                key={index}
                index={index}
                data={item}
                type={pointsFilter}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RankingTable;

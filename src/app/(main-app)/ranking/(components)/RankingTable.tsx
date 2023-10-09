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
    throw new Error();
  }

  return (
    <div className="relative rounded-lg sm:shadow-xl">
      <RakingTableReloadButton finishedReloading={true} />
      <table className="w-full">
        <thead>
          <tr className="flex h-16 items-center justify-around bg-teal-700 px-0 text-base font-semibold text-teal-50 shadow-xl xs:text-lg xs:font-bold sm:rounded-t-lg sm:pl-4 sm:pr-8 md:px-12 lg:px-24">
            <th className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
              Posición
            </th>
            <th className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
              Avatar
            </th>
            <th className="flex w-[30%] items-center justify-center xs:w-[25%]">
              Nombre
            </th>
            <th className="flex w-[25%] items-center justify-center">
              {pointsFilter === "coins" && "Monedas"}
              {pointsFilter === "diamonds" && "Diamantes"}
              {pointsFilter === "max_level" && "Máximo nivel"}
            </th>
          </tr>
        </thead>
      </table>

      <div className="scrollbar-ranking h-[calc(100vh-14.7rem)] overflow-y-auto sm:h-[calc(100vh-16rem)] sm:rounded-b-lg 2xl:h-[calc(100vh-18rem)]">
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

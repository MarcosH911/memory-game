import RankingRow from "./RankingRow";
import RakingTableReloadButton from "./RankingTableReloadButton";

type dataType =
  | Database["public"]["Views"]["points_ranking_all_time"]["Row"][]
  | null;

interface Props {
  data: dataType;
  pointsFilter: string;
}

function RankingTable({ data, pointsFilter }: Props) {
  return (
    <div className="relative rounded-lg shadow-xl">
      <RakingTableReloadButton />
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

      <div className="h-[60vh] overflow-y-auto rounded-b-lg scrollbar-ranking">
        <table className="w-full rounded-lg">
          <tbody className="rounded-lg h-full">
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

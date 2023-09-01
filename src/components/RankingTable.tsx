import { Database } from "../../types/supabase";
import RankingRow from "./RankingRow";

interface RankingTableProps {
  data: Database["public"]["Views"]["points_ranking_all_time"]["Row"][];
  title: string;
  type: string;
}

function RankingTable({ data, title, type }: RankingTableProps) {
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          {data.map((item, index) => (
            <RankingRow key={index} index={index} data={item} type={type} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingTable;

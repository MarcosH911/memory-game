import { Database } from "../../types/supabase";
import RankingRow from "./RankingRow";

interface RankingTableProps {
  data: Database["public"]["Views"]["daily_points"]["Row"][];
  title: string;
}

function RankingTable({ data, title }: RankingTableProps) {
  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          {data.map((item, index) => (
            <RankingRow key={index} data={item} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RankingTable;

import { Database } from "../../types/supabase";

interface RankingTableProps {
  data: Database["public"]["Views"]["daily_points"]["Row"];
  index: number;
}

function RankingRow({ data, index }: RankingTableProps) {
  return (
    <tr>
      <td>{index}</td>
      <td>{data.avatar_path}</td>
      <td>{data.full_name}</td>
      <td>{data.daily_diamonds}</td>
    </tr>
  );
}

export default RankingRow;

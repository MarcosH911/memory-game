import { Database } from "../../types/supabase";

interface RankingTableProps {
  data: Database["public"]["Views"]["points_ranking_all_time"]["Row"];
  index: number;
  type: string;
}

function RankingRow({ data, index, type }: RankingTableProps) {
  return (
    <tr>
      <td>{index}</td>
      <td>{data.avatar_path}</td>
      <td>{data.full_name}</td>
      <td>
        {type === "coins"
          ? data.coins
          : type === "diamonds"
          ? data.diamonds
          : data.max_level}
      </td>
    </tr>
  );
}

export default RankingRow;

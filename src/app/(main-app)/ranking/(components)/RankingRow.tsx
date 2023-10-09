import Image from "next/image";
import { BiSolidCoinStack } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { FaLevelUpAlt } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import getAvatarImage from "@/utils/getAvatarImage";

interface Props {
  data: Database["public"]["Views"]["points_ranking_all_time"]["Row"];
  index: number;
  type: string;
}

function RankingRow({ data, index, type }: Props) {
  const avatarUrl = getAvatarImage(data.avatar_path);

  return (
    <tr className="flex h-14 items-center justify-around px-0 even:bg-teal-100 sm:pl-4 sm:pr-8 md:px-12 lg:px-24">
      <td className="flex w-[22.5%] items-center justify-center text-lg font-bold xs:w-[25%]">
        {index + 1}
      </td>
      <td className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
        <Image
          src={avatarUrl}
          alt="Avatar Image"
          width={40}
          height={40}
          className="rounded-full bg-slate-300"
        />
      </td>
      <td className="flex w-[30%] items-center justify-center text-center font-medium xs:w-[25%]">
        {data.full_name}
      </td>
      <td
        className={twMerge(
          "flex w-[25%] items-center justify-center gap-1 font-semibold",
          type === "coins" && "text-yellow-600",
          type === "diamonds" && "text-purple-600",
          type === "max_level" && "text-green-600"
        )}
      >
        {type === "coins" ? (
          <>
            <span className="font-bold">{data.coins}</span>
            <BiSolidCoinStack />
          </>
        ) : type === "diamonds" ? (
          <>
            <span className="font-bold">{data.diamonds}</span>
            <IoDiamond />
          </>
        ) : (
          <>
            <span className="font-bold">{data.max_level}</span>
            <FaLevelUpAlt />
          </>
        )}
      </td>
    </tr>
  );
}

export default RankingRow;

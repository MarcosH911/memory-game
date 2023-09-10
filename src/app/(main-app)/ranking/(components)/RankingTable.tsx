import { twMerge } from "tailwind-merge";
import { HiMiniArrowPath } from "react-icons/hi2";
import * as ScrollArea from "@radix-ui/react-scroll-area";

import RankingRow from "./RankingRow";

interface Props {
  data: Database["public"]["Views"]["points_ranking_all_time"]["Row"][];
  type: string;
  isReloading: boolean;
  setIsReloading: React.Dispatch<React.SetStateAction<boolean>>;
}

function RankingTable({ data, type, isReloading, setIsReloading }: Props) {
  return (
    <div className="relative rounded-lg shadow-xl">
      <button
        onClick={() => setIsReloading(true)}
        className="absolute right-3.5 top-3.5 rounded-md p-1.5 text-2xl text-white transition hover:bg-teal-800"
      >
        <HiMiniArrowPath className={twMerge(isReloading && "animate-spin")} />
      </button>
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
              {type === "coins"
                ? "Monedas"
                : type === "diamonds"
                ? "Diamantes"
                : "Máximo nivel"}
            </th>
          </tr>
        </thead>
      </table>
      <ScrollArea.Root type="auto" className="h-[60vh] overflow-hidden">
        <ScrollArea.Viewport className="h-full w-full rounded-b-lg">
          <table className="w-full rounded-lg">
            <tbody className="rounded-lg">
              {data.map((item, index) => (
                <RankingRow key={index} index={index} data={item} type={type} />
              ))}
            </tbody>
          </table>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="mx-1 my-3 w-2 rounded-full bg-slate-300/80 shadow-sm transition hover:bg-slate-300"
        >
          <ScrollArea.Thumb className="rounded-full bg-slate-400 transition-colors hover:bg-slate-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default RankingTable;

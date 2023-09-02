import { twMerge } from "tailwind-merge";
import RankingRow from "./RankingRow";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { HiMiniArrowPath } from "react-icons/hi2";

interface RankingTableProps {
  data: Database["public"]["Views"]["points_ranking_all_time"]["Row"][];
  type: string;
  isReloading: boolean;
  setIsReloading: React.Dispatch<React.SetStateAction<boolean>>;
}

function RankingTable({
  data,
  type,
  isReloading,
  setIsReloading,
}: RankingTableProps) {
  return (
    <div className="shadow-xl rounded-lg relative">
      <button
        onClick={() => setIsReloading(true)}
        className="absolute right-3.5 top-3.5 text-white text-2xl hover:bg-teal-800 transition rounded-md p-1.5"
      >
        <HiMiniArrowPath className={twMerge(isReloading && "animate-spin")} />
      </button>
      <table className="w-full">
        <thead>
          <tr className="flex justify-around px-24 h-16 items-center bg-teal-700 text-teal-50 shadow-xl rounded-t-lg">
            <th className="flex items-center justify-center w-[25%] text-lg font-bold">
              Posición
            </th>
            <th className="flex items-center justify-center w-[25%] text-lg font-bold">
              Avatar
            </th>
            <th className="flex items-center justify-center w-[25%] text-lg font-bold">
              Nombre
            </th>
            <th className="flex items-center justify-center w-[25%] text-lg font-bold">
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
        <ScrollArea.Viewport className="w-full h-full rounded-b-lg">
          <table className="w-full rounded-lg">
            <tbody className="rounded-lg">
              {data.map((item, index) => (
                <RankingRow key={index} index={index} data={item} type={type} />
                // {/* <RankingRow
                //   key={index}
                //   index={index}
                //   data={item}
                //   type={type}
                // />
                // <RankingRow
                //   key={index}
                //   index={index}
                //   data={item}
                //   type={type}
                // />
                // <RankingRow
                //   key={index}
                //   index={index}
                //   data={item}
                //   type={type}
                // />
                // <RankingRow
                //   key={index}
                //   index={index}
                //   data={item}
                //   type={type}
                // /> */}
              ))}
            </tbody>
          </table>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="w-2 bg-slate-300/80 rounded-full hover:bg-slate-300 transition mx-1 my-3 shadow-sm"
        >
          <ScrollArea.Thumb className="bg-slate-400 rounded-full hover:bg-slate-500 transition-colors" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default RankingTable;

import { twMerge } from "tailwind-merge";

interface Props {
  index: number;
  isSelected: boolean;
}

function StartSquare({ index, isSelected }: Props) {
  return (
    <div className={twMerge("p-[3%]", index === 4 && "col-start-3")}>
      <div
        className={twMerge(
          "h-full select-none rounded-2xl border border-teal-600 border-opacity-30 bg-teal-300 transition duration-100",
          isSelected &&
            "border-opacity-100 bg-teal-600 shadow-[0_0_15px_3px] shadow-slate-900/20",
        )}
      ></div>
    </div>
  );
}

export default StartSquare;

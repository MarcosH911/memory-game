import { twMerge } from "tailwind-merge";

interface SquareProps {
  selected: boolean;
  isPlayerTurn: boolean;
  isComputerTurn: boolean;
  onClick: () => void;
}

function Square({
  selected,
  isPlayerTurn,
  isComputerTurn,
  onClick,
}: SquareProps) {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "bg-teal-300 rounded-2xl transition duration-250 select-none cursor-pointer border border-teal-600 border-opacity-30",
        isComputerTurn &&
          selected &&
          "bg-teal-600 shadow-[0_0_15px_3px] shadow-black/10 transition-none border-opacity-100",
        isPlayerTurn &&
          "active:bg-teal-600 active:shadow-[0_0_15px_3px] active:shadow-black/10 active:transition-none active:border-opacity-100",
      )}
    ></div>
  );
}

export default Square;

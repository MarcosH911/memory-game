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
        "cursor-pointer select-none rounded-2xl border border-teal-600 border-opacity-30 bg-teal-300 transition duration-250",
        isComputerTurn &&
          selected &&
          "border-opacity-100 bg-teal-600 shadow-[0_0_15px_3px] shadow-black/10 transition-none",
        isPlayerTurn &&
          "active:border-opacity-100 active:bg-teal-600 active:shadow-[0_0_15px_3px] active:shadow-black/10 active:transition-none",
      )}
    ></div>
  );
}

export default Square;

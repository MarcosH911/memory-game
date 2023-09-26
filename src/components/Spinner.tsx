import { CgSpinnerTwoAlt } from "react-icons/cg";
import { twMerge } from "tailwind-merge";

interface Props {
  visible: boolean;
  size: "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl";
}

function Spinner({ visible, size }: Props) {
  return (
    <CgSpinnerTwoAlt
      className={twMerge(
        "invisible absolute inset-0 m-auto animate-spin",
        size === "lg" && "text-lg",
        size === "xl" && "text-xl",
        size === "2xl" && "text-2xl",
        size === "3xl" && "text-3xl",
        size === "4xl" && "text-4xl",
        size === "5xl" && "text-5xl",
        size === "6xl" && "text-6xl",
        size === "7xl" && "text-7xl",
        size === "8xl" && "text-8xl",
        visible && "visible",
      )}
    />
  );
}

export default Spinner;

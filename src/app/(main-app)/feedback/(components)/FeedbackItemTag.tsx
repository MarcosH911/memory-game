import { twMerge } from "tailwind-merge";

interface Props {
  tag: string;
}

function FeedbackItemTag({ tag }: Props) {
  return (
    <span
      className={twMerge(
        "px-2 py-0.5 uppercase text-xs font-bold rounded-full",
        tag === "bug" && "bg-red-600 text-red-50",
        tag === "suggestion" && "bg-blue-600 text-blue-50",
      )}
    >
      {tag === "bug" && "Error"}
      {tag === "suggestion" && "Sugerencia"}
    </span>
  );
}

export default FeedbackItemTag;

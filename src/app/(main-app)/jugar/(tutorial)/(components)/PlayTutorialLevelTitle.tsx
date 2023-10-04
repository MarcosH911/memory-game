import { twMerge } from "tailwind-merge";

interface Props {
  level: number;
  type?: "small" | "big";
}

function PlayTutorialLevelTitle({ level, type = "big" }: Props) {
  return (
    <h1
      className={twMerge(
        "relative rounded-lg border border-teal-200 bg-teal-100 px-6 py-3 text-7xl font-bold text-teal-950 shadow-md shadow-teal-200/50",
        type === "small" && "px-4 py-2 text-4xl",
        level === -1 && "text-transparent",
      )}
    >
      Nivel {level === -1 ? 0 : level}
      {level === -1 && (
        <div className="absolute left-1/2 top-1/2 h-5 w-48 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-400"></div>
      )}
    </h1>
  );
}

export default PlayTutorialLevelTitle;

import { twMerge } from "tailwind-merge";

interface Props {
  level: number;
}

function PlayLevelTitle({ level }: Props) {
  return (
    <h1
      className={twMerge(
        "relative mb-4 mt-6 rounded-lg border border-teal-200 bg-teal-100 px-6 py-3 text-5xl font-bold text-teal-950 shadow-md shadow-teal-200/50 2xl:text-6xl",
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

export default PlayLevelTitle;

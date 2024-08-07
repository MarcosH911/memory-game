import { twMerge } from "tailwind-merge";

interface Props {
  level: number;
  type?: "small" | "big";
}

function PlayTutorialLevelTitle({ level, type = "big" }: Props) {
  return (
    <h1
      className={twMerge(
        "relative rounded-lg border border-teal-200 bg-teal-100 px-5 py-3 text-5xl font-bold text-teal-950 shadow-md shadow-teal-200/50 xs:px-6 h-md:text-7xl",
        type === "small" &&
          "px-[1.5vh] py-0 text-[3.5vh] supports-[padding:1.5dvh]:px-[1.5dvh] supports-[font-size:3.5dvh]:text-[3.5dvh] h-md:px-[2vh] h-md:text-[5vh] h-md:supports-[padding:2dvh]:px-[2dvh] h-md:supports-[font-size:5dvh]:text-[5dvh]",
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

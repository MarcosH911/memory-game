import { twMerge } from "tailwind-merge";

interface Props {
  selectedSquare: number | null;
  type?: "small" | "big";
}

function PlayTutorialSquares({ selectedSquare, type = "big" }: Props) {
  return (
    <div className="relative grid aspect-square h-[min(100%,26.25rem)] grid-cols-3 grid-rows-3">
      {Array(8)
        .fill(true)
        .map((_, index) => (
          <div
            key={index}
            className={twMerge("p-[3%]", index === 4 && "col-start-3")}
          >
            <div
              className={twMerge(
                "h-full select-none rounded-2xl border border-teal-600 border-opacity-30 bg-teal-300 transition duration-100",
                type === "small" && "h-lg:rounded-2xl rounded-[1.5vh]",
                selectedSquare === index &&
                  "border-opacity-100 bg-teal-600 shadow-[0_0_15px_3px] shadow-slate-900/20",
              )}
            ></div>
          </div>
        ))}

      <div className="absolute bottom-1/2 right-1/2 h-[5%] w-[1%] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-600"></div>
      <div className="absolute bottom-1/2 right-1/2 h-[1%] w-[5%] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-600"></div>
    </div>
  );
}

export default PlayTutorialSquares;

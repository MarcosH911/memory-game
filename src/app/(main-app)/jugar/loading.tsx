import { twMerge } from "tailwind-merge";

function Loading() {
  return (
    <div className="flex h-full animate-pulse flex-col items-center justify-start">
      <div className="mb-4 mt-6 h-[6.125rem] w-72 rounded-lg border-2 border-slate-400 bg-slate-200 flex items-center justify-center">
        <div className="h-5 w-60 rounded-full bg-slate-400"></div>
      </div>
      <div className="mb-4 grid aspect-square h-2/3 grid-cols-3 grid-rows-3">
        {Array(8)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className={twMerge("p-[3%]", index === 4 && "col-start-3")}
            >
              <div className="h-full rounded-2xl border border-transparent bg-slate-300"></div>
            </div>
          ))}
      </div>

      <button className="relative h-28 w-full max-w-3xl -translate-y-2 rounded-lg border-4 border-slate-400 bg-slate-200">
        <div className="absolute right-1/2 top-5 h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-400"></div>
      </button>
    </div>
  );
}

export default Loading;
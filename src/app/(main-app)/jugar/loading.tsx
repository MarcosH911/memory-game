import { twMerge } from "tailwind-merge";

function Loading() {
  return (
    <div className="flex h-full animate-pulse flex-col items-center justify-center">
      <h1 className="relative mb-4 mt-6 rounded-lg border border-slate-400 bg-slate-200 px-6 py-3 text-5xl font-bold text-transparent 2xl:text-6xl">
        <div className="absolute left-1/2 top-1/2 h-5 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
        Level 1
      </h1>

      <div className="relative mb-16 grid aspect-square h-[min(66.7%,95vw)] grid-cols-3 grid-rows-3 sm:mb-4">
        {Array(8)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className={twMerge("p-[3%]", index === 4 && "col-start-3")}
            >
              <div className="h-full rounded-2xl border border-slate-400 bg-slate-300"></div>
            </div>
          ))}
      </div>
      <button className="relative my-2 h-20 w-full max-w-[min(24rem,95vw)] -translate-y-2 rounded-lg border-4 border-slate-400 bg-slate-100 sm:max-w-md md:max-w-lg xl:h-24 xl:max-w-xl 2xl:h-28 2xl:max-w-3xl">
        <div className="absolute right-1/2 top-[17.5%] h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-400"></div>
      </button>
    </div>
  );
}

export default Loading;

import { twMerge } from "tailwind-merge";

function RankingFiltersLoading() {
  return (
    <div className="animate-pulse">
      <button className="mx-auto mb-4 mt-6 flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-200 px-10 py-3 font-semibold xl:hidden">
        <div className="h-4 w-4 rounded-full bg-slate-400"></div>
        <span className="relative text-transparent">
          Filtros
          <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
        </span>
      </button>
      <div className="relative mb-4 mt-8 hidden items-center justify-between xl:flex xl:flex-row">
        <ul className="flex rounded-full bg-slate-200">
          {["day", "week", "month", "year", "all_time"].map(
            (itemType, index) => (
              <li key={index}>
                <div
                  className={twMerge(
                    "rounded-full px-2 py-1.5 text-sm font-semibold text-transparent xs:px-3 sm:px-5 sm:py-3 sm:text-base",
                    index === 0 && "pl-2.5",
                    index === 4 && "pr-2.5",
                  )}
                >
                  <span className="relative">
                    {itemType === "day" && "Día"}
                    {itemType === "week" && "Semana"}
                    {itemType === "month" && "Mes"}
                    {itemType === "year" && "Año"}
                    {itemType === "all_time" && "Todo el tiempo"}
                    <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                </div>
              </li>
            ),
          )}
        </ul>

        <div className="hidden items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-200 px-10 py-3 font-semibold xl:flex">
          <div className="h-5 w-5 rounded-full bg-slate-400"></div>
          <span className="relative text-transparent">
            Filtros avanzados
            <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
          </span>
        </div>

        <ul className="relative flex rounded-full bg-slate-200">
          {["coins", "diamonds", "max_level"].map((itemType, index) => (
            <li key={index}>
              <button
                className={twMerge(
                  "flex items-center gap-0.5 rounded-full px-1.5 py-2 text-sm text-transparent xs:gap-1 xs:px-3 sm:gap-1.5 sm:px-6 sm:py-3 sm:text-base",
                  index === 0 && "pl-2",
                  index === 2 && "pr-2",
                )}
              >
                <div className="h-3.5 w-3.5 rounded-full bg-slate-400 sm:h-4 sm:w-4"></div>

                <span className="relative font-bold">
                  {itemType === "coins" && "Monedas"}
                  {itemType === "diamonds" && "Diamantes"}
                  {itemType === "max_level" && "Máximo nivel"}
                  <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RankingFiltersLoading;

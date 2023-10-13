import { twMerge } from "tailwind-merge";

function Loading() {
  return (
    <div className="flex h-full animate-pulse justify-center">
      <div className="w-full sm:mx-4 xl:w-[80rem]">
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
        <div className="relative rounded-lg border border-slate-300">
          <table className="w-full">
            <thead>
              <tr className="flex h-16 items-center justify-around bg-slate-300 px-0 text-base font-semibold text-transparent xs:text-lg xs:font-bold sm:rounded-t-lg sm:pl-4 sm:pr-8 md:px-12 lg:px-24">
                <th className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
                  <span className="relative">
                    Posición
                    <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                </th>
                <th className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
                  <span className="relative">
                    Avatar
                    <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                </th>
                <th className="flex w-[30%] items-center justify-center xs:w-[25%]">
                  <span className="relative">
                    Nombre
                    <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                </th>
                <th className="flex w-[25%] items-center justify-center">
                  <span className="relative">
                    Monedas
                    <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                </th>
              </tr>
            </thead>
          </table>

          <div className="h-[calc(100dvh-14.7rem)] overflow-y-hidden sm:h-[calc(100dvh-16rem)] sm:rounded-b-lg 2xl:h-[calc(100dvh-18rem)]">
            <table className="w-full rounded-lg">
              <tbody className="h-full rounded-lg">
                {Array(14)
                  .fill(true)
                  .map((_, index) => (
                    <tr
                      key={index}
                      className="flex h-14 items-center justify-around px-0 even:bg-slate-200 sm:pl-4 sm:pr-8 md:px-12 lg:px-24"
                    >
                      <td className="flex w-[22.5%] items-center justify-center text-lg font-bold xs:w-[25%]">
                        <span className="relative text-transparent">
                          10
                          <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                        </span>
                      </td>
                      <td className="flex w-[22.5%] items-center justify-center xs:w-[25%]">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-full bg-slate-400"></div>
                      </td>
                      <td className="flex w-[30%] items-center justify-center text-center font-medium xs:w-[25%]">
                        <span className="relative text-transparent">
                          XXXXXX XXXXXXX
                          <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                        </span>
                      </td>
                      <td className="flex w-[25%] items-center justify-center gap-1 font-semibold">
                        <span className="relative text-transparent">
                          100
                          <div className="absolute left-1/2 top-1/2 h-2 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                        </span>
                        <div className="h-4 w-4 rounded-full bg-slate-400"></div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;

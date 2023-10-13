function RankingTableLoading() {
  return (
    <div className="relative animate-pulse rounded-lg border border-slate-300">
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

      <div className="h-[calc(100svh-14.7rem)] overflow-y-hidden sm:h-[calc(100svh-16rem)] sm:rounded-b-lg 2xl:h-[calc(100svh-18rem)]">
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
  );
}

export default RankingTableLoading;

function RankingTableLoading() {
  return (
    <div className="relative animate-pulse rounded-lg border-2 border-slate-400 bg-slate-400">
      <table className="w-full">
        <thead>
          <tr className="flex h-16 items-center justify-around rounded-t-md bg-slate-300 px-24">
            <th className="flex h-2 w-24 items-center justify-center rounded-full bg-slate-400"></th>
            <th className="flex h-2 w-24 items-center justify-center rounded-full bg-slate-400"></th>
            <th className="flex h-2 w-24 items-center justify-center rounded-full bg-slate-400"></th>
            <th className="flex h-2 w-24 items-center justify-center rounded-full bg-slate-400"></th>
          </tr>
        </thead>
      </table>

      <div className="h-[60vh] overflow-y-hidden rounded-b-lg">
        <table className="w-full rounded-lg">
          <tbody className="h-full rounded-lg">
            {Array(10)
              .fill(true)
              .map((_, index) => (
                <tr
                  key={index}
                  className="flex h-14 items-center justify-around px-24 odd:bg-teal-50 even:bg-slate-200"
                >
                  <td className="flex w-[25%] items-center justify-center text-lg font-bold">
                    <div className="h-2 w-8 rounded-full bg-slate-400"></div>
                  </td>
                  <td className="flex w-[25%] items-center justify-center">
                    <div className="h-10 w-10 rounded-full bg-slate-400"></div>
                  </td>
                  <td className="flex w-[25%] items-center justify-center font-medium">
                    <div className="h-2 w-36 rounded-full bg-slate-400"></div>
                  </td>
                  <td className="flex w-[25%] items-center justify-center gap-1 font-semibold">
                    <div className="h-2 w-12 rounded-full bg-slate-400"></div>
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

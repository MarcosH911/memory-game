function Loading() {
  return (
    <div className="flex animate-pulse flex-col items-center py-8">
      <div className="mb-6 flex h-[4.5rem] items-center justify-center">
        <div className="h-5 w-96 rounded-full bg-slate-400"></div>
      </div>
      <div className="flex h-64 w-[80rem] divide-x-2 divide-teal-50 overflow-hidden rounded-lg">
        {Array(5)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="flex h-64 w-64 items-center justify-center bg-slate-200"
            >
              <div className="h-[12.5rem] w-[12.5rem] rounded-full border-4 border-slate-400 bg-slate-300"></div>
            </div>
          ))}
      </div>
      <div className="mb-24 mt-8 flex h-[3.875rem] items-center justify-center gap-8">
        <div className="h-full w-[10.125rem] rounded-md border-2 border-slate-400 bg-slate-300"></div>
        <div className="h-full w-[10.125rem] rounded-md bg-slate-400"></div>
      </div>
      <div className="mb-6 flex h-[4.5rem] items-center justify-center">
        <div className="h-5 w-[40rem] rounded-full bg-slate-400"></div>
      </div>
      <div className="mx-auto grid w-[80rem] grid-cols-6 gap-8">
        {Array(6)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-lg border border-slate-300 bg-slate-200 py-6"
            >
              <div className="mb-4 aspect-square h-[8.125rem] rounded-full border-4 border-slate-400 bg-slate-300"></div>
              <div className="mb-2 flex h-[2.375rem] w-3/4 items-center justify-center rounded-md border border-slate-400 bg-slate-300"></div>
              <div className="mb-2 flex h-[2.375rem] w-3/4 items-center justify-center rounded-md border border-slate-400 bg-slate-400"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loading;

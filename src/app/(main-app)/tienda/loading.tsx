function Loading() {
  return (
    <div className="py-8 flex flex-col items-center animate-pulse">
      <div className="mb-6 h-[4.5rem] flex items-center justify-center">
        <div className="h-5 w-96 rounded-full bg-slate-400"></div>
      </div>
      <div className="w-[80rem] h-64 rounded-lg divide-x-2 divide-teal-50 flex overflow-hidden">
        {Array(5)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="h-64 w-64 bg-slate-200 flex items-center justify-center"
            >
              <div className="h-[12.5rem] w-[12.5rem] bg-slate-300 rounded-full border-4 border-slate-400"></div>
            </div>
          ))}
      </div>
      <div className="mt-8 mb-24 flex items-center justify-center h-[3.875rem] gap-8">
        <div className="w-[10.125rem] h-full bg-slate-300 border-2 border-slate-400 rounded-md"></div>
        <div className="w-[10.125rem] h-full bg-slate-400 rounded-md"></div>
      </div>
      <div className="mb-6 h-[4.5rem] flex items-center justify-center">
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
              <div className="h-[8.125rem] aspect-square rounded-full border-4 border-slate-400 bg-slate-300 mb-4"></div>
              <div className="mb-2 flex w-3/4 items-center justify-center rounded-md border border-slate-400 bg-slate-300 h-[2.375rem]"></div>
              <div className="mb-2 flex w-3/4 items-center justify-center rounded-md border border-slate-400 bg-slate-400 h-[2.375rem]"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loading;

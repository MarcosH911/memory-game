function Loading() {
  return (
    <div className="mx-auto max-w-7xl pt-8 animate-pulse">
      <div className="mb-4 h-[4.5rem] flex items-center justify-center">
        <div className="h-5 w-[25rem] rounded-full bg-slate-400"></div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {Array(16)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 border-2 border-slate-300 flex items-center justify-center rounded-2xl p-6"
            >
              <div className="h-[15.75rem] aspect-square rounded-full bg-slate-300 border-8 border-slate-400"></div>
            </div>
          ))}
        d
      </div>
    </div>
  );
}

export default Loading;

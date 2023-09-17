function Loading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse pt-8">
      <div className="mb-4 flex h-[4.5rem] items-center justify-center">
        <div className="h-5 w-[25rem] rounded-full bg-slate-400"></div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {Array(16)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-2xl border-2 border-slate-300 bg-slate-200 p-6"
            >
              <div className="aspect-square h-[15.75rem] rounded-full border-8 border-slate-400 bg-slate-300"></div>
            </div>
          ))}
        d
      </div>
    </div>
  );
}

export default Loading;

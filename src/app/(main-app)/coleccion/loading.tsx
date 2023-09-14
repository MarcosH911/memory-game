function Loading() {
  return (
    <div className="mx-auto max-w-7xl pt-[7.5rem] animate-pulse">
      <div className="grid grid-cols-4 gap-x-6 gap-y-10">
        {Array(20)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="bg-slate-200 border-2 border-slate-300 flex items-center justify-center rounded-2xl p-6"
            >
              <div className="h-[16.25rem] aspect-square rounded-full bg-slate-300 border-8 border-slate-400"></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loading;

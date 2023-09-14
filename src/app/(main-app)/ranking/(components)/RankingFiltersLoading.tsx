function RankingFiltersLoading() {
  return (
    <div className="relative mb-6 flex animate-pulse items-center justify-between">
      <div className="flex h-12 w-[28.25rem] items-center gap-6 rounded-full bg-slate-200 px-4">
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
      </div>
      <div className="flex h-12 w-[28.5rem] items-center gap-8 rounded-full bg-slate-200 px-4">
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
        <div className="h-1.5 w-full rounded-full bg-slate-400"></div>
      </div>
    </div>
  );
}

export default RankingFiltersLoading;

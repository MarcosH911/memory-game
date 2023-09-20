function Loading() {
  return (
    <div className="mx-auto animate-pulse py-8 xs:max-w-[40rem] md:max-w-[60rem] xl:max-w-[80rem]">
      <h1 className="relative mb-8 text-center text-5xl font-semibold text-transparent xs:text-6xl lg:text-7xl">
        <div className="absolute left-1/2 top-1/2 h-4 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 xs:h-5 xs:w-80 lg:h-6 lg:w-96"></div>
        Avatares (12)
      </h1>
      <div className="mx-3 grid grid-cols-2 gap-x-3 gap-y-3 xs:mx-8 xs:gap-x-6 xs:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {Array(16)
          .fill(true)
          .map((_, index) => (
            <div key={index} className="group relative">
              <button className="flex aspect-square h-full w-full items-center justify-center rounded-2xl border-[3px] border-transparent p-3 duration-300 xs:border-4 xs:p-4 lg:p-6">
                <div className="h-full max-h-[14.375rem] w-full max-w-[14.375rem] rounded-full border-4 border-slate-400 bg-slate-300 xs:border-[6px] lg:border-8"></div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Loading;

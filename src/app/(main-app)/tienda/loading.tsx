function Loading() {
  return (
    <div className="animate-pulse py-8">
      <div className="mb-24 flex flex-col items-center justify-center">
        <h1 className="relative mb-6 text-4xl font-semibold tracking-tight text-transparent xs:text-5xl sm:text-6xl lg:text-7xl">
          ¡Gira la ruleta!
          <div className="absolute left-1/2 top-1/2 h-4 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 xs:h-6 sm:h-8"></div>
        </h1>
        <div className="relative">
          <div className="relative aspect-[3] w-[calc(100vw-1rem)] overflow-hidden rounded-lg md:aspect-[5] xl:w-[min(calc(100vw-1rem),80rem)]">
            <div className="flex flex-row flex-nowrap items-center justify-start divide-x-2 divide-teal-50 rounded-lg">
              {Array(5)
                .fill(true)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex aspect-square w-[calc((100vw-1rem)/3)] flex-shrink-0 items-center justify-center bg-slate-200 p-2 xs:p-3 md:w-[calc((100vw-1rem)/5)] xl:w-[min(calc((100vw-1rem)/5),16rem)] xl:p-4"
                  >
                    <div className="relative h-full w-full">
                      <div className="aspect-square h-fit rounded-full border-2 border-slate-400 bg-slate-300 xs:border-4"></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 xs:mt-6 xs:gap-4 sm:mt-8 sm:gap-8">
            <button className="relative flex items-center justify-center gap-1 rounded-md border border-slate-400 bg-slate-300 px-5 py-1.5 text-transparent xs:px-8 xs:py-2 sm:px-12 sm:py-3">
              <span className="visible relative text-2xl font-bold sm:text-3xl">
                60
                <div className="absolute left-1/2 top-1/2 h-2.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
              </span>
              <div className="aspect-square h-5 rounded-full bg-slate-400 sm:h-6"></div>
            </button>
            <button className="relative flex items-center justify-center gap-1 rounded-md border border-slate-400 bg-slate-400 px-5 py-1.5 text-transparent xs:px-8 xs:py-2 sm:px-12 sm:py-3">
              <span className="visible relative text-2xl font-bold sm:text-3xl">
                15
                <div className="absolute left-1/2 top-1/2 h-2.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500"></div>
              </span>
              <div className="aspect-square h-5 rounded-full bg-slate-500 sm:h-6"></div>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="relative mb-6 block text-4xl font-semibold text-transparent xs:text-5xl sm:text-6xl lg:text-7xl">
            O compra tu favorito
            <div className="absolute left-1/2 top-1/2 h-4 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400 xs:h-6 sm:h-8"></div>
          </h1>
        </div>
        <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4 px-2 xs:gap-8 sm:max-w-2xl sm:grid-cols-3 md:max-w-4xl md:grid-cols-4 lg:max-w-6xl lg:grid-cols-5 xl:max-w-7xl xl:grid-cols-6">
          {Array(20)
            .fill(true)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-lg border bg-slate-200 py-6"
              >
                <div className="relative mb-4 h-28 w-28 rounded-full border-4 border-slate-400 bg-slate-300 xs:h-32 xs:w-32"></div>
                <button className="relative mb-2 flex w-3/4 items-center justify-center gap-1 rounded-md border border-slate-400 bg-slate-300 py-1 text-transparent">
                  <span className="visible relative text-lg font-bold">
                    100
                    <div className="absolute left-1/2 top-1/2 h-2.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
                  </span>
                  <div className="aspect-square h-5 rounded-full bg-slate-400"></div>
                </button>
                <button className="relative flex w-3/4 items-center justify-center gap-1 rounded-md border border-slate-400 bg-slate-400 py-1 text-transparent">
                  <span className="visible relative text-lg font-bold">
                    25
                    <div className="absolute left-1/2 top-1/2 h-2.5 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-500"></div>
                  </span>
                  <div className="aspect-square h-5 rounded-full bg-slate-500"></div>
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Loading;

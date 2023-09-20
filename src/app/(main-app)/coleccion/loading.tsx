function Loading() {
  return (
    <div className="mx-auto py-8 xs:max-w-[40rem] md:max-w-[60rem] xl:max-w-[80rem]">
      <h1 className="mb-8 text-center text-5xl font-semibold text-transparent xs:text-6xl lg:text-7xl">
        Avatares (12)
      </h1>
      <div className="mx-3 grid grid-cols-2 gap-x-3 gap-y-3 xs:mx-8 xs:gap-x-6 xs:gap-y-10 md:grid-cols-3 xl:grid-cols-4">
        {Array(12)
          .fill(true)
          .map((_, index) => (
            <div key={index} className="group relative">
              <button className="flex items-center justify-center rounded-2xl border-[3px] border-transparent p-3 duration-300 xs:border-4 xs:p-4 lg:p-6">
                <div className="h-[16.25rem] w-[16.25rem] rounded-full border-4 border-slate-400 bg-slate-300 xs:border-[6px] lg:border-8"></div>
              </button>
            </div>
          ))}
      </div>
    </div>
    // <div className="mx-auto max-w-7xl animate-pulse pt-8">
    //   <div className="mb-4 flex h-[4.5rem] items-center justify-center">
    //     <div className="h-5 w-[25rem] rounded-full bg-slate-400"></div>
    //   </div>
    //   <div className="grid grid-cols-4 gap-x-6 gap-y-10">
    //     {Array(16)
    //       .fill(true)
    //       .map((_, index) => (
    //         <div
    //           key={index}
    //           className="flex items-center justify-center rounded-2xl border-2 border-slate-300 bg-slate-200 p-6"
    //         >
    //           <div className="aspect-square h-[15.75rem] rounded-full border-8 border-slate-400 bg-slate-300"></div>
    //         </div>
    //       ))}
    //     d
    //   </div>
    // </div>
  );
}

export default Loading;

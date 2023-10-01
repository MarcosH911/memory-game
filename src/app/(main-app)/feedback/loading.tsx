function Loading() {
  return (
    <div className="animate-pulse overflow-x-hidden pb-20">
      <div className="flex items-center justify-center">
        <h1 className="relative mt-8 text-5xl font-bold text-transparent sm:text-6xl">
          Feedback
          <div className="absolute left-1/2 top-1/2 h-8 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <h2 className="relative mb-8 mt-4 text-lg text-teal-800 text-transparent sm:mb-10 sm:mt-6 sm:text-xl">
          Ayúdanos a mejorar
          <div className="absolute left-1/2 top-1/2 h-4 w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400"></div>
        </h2>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col justify-start gap-6 px-3 xs:px-5 sm:px-10 md:px-20">
        <div className="group rounded-2xl bg-slate-300 pl-10 pr-6 xs:pl-12 sm:pl-16 sm:pr-12">
          <span className="block w-full py-8 text-base empty:before:text-transparent empty:before:content-['Escribe\auna\asugerencia'] xs:text-lg"></span>
        </div>
        <hr className="-mx-[100vw] my-4 w-[200vw] border-slate-300 sm:my-6" />
        {Array(4)
          .fill(true)
          .map((_, index) => (
            <div
              key={index}
              className="h-[8.5rem] rounded-2xl bg-slate-300 py-6 pr-6 text-teal-950 sm:pr-12"
            ></div>
          ))}
      </div>
    </div>
  );
}

export default Loading;

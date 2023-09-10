function PlayCenterCrosshair() {
  return (
    <>
      <div className="absolute bottom-1/2 right-1/2 h-[calc(7.5%-1px)] w-[calc(1%-1px)] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-300"></div>
      <div className="absolute bottom-1/2 right-1/2 h-[calc(1%-1px)] w-[calc(7.5%-1px)] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-300"></div>
      <div className="absolute bottom-1/2 right-1/2 -z-10 h-[7.5%] w-[1%] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-600"></div>
      <div className="absolute bottom-1/2 right-1/2 -z-10 h-[1%] w-[7.5%] translate-x-1/2 translate-y-1/2 rounded-full bg-teal-600"></div>
    </>
  );
}

export default PlayCenterCrosshair;

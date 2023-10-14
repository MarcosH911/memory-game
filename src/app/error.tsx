"use client";

interface Props {
  reset: () => void;
}

function Error({ reset }: Props) {
  return (
    <div className="flex h-[100vh] w-screen flex-col items-center justify-center bg-red-600 supports-[height:100dvh]:h-[100dvh]">
      <h1 className="mb-8 px-4 text-center text-4xl font-medium text-red-50 xs:text-5xl sm:text-7xl">
        Ha ocurrido un error inesperado
      </h1>
      <button
        onClick={() => reset()}
        className="rounded-md bg-red-50 px-6 py-3 text-2xl font-bold text-red-900 shadow-lg transition duration-200 hover:bg-red-100 hover:shadow-xl"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

export default Error;

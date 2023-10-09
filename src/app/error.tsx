"use client";

interface Props {
  reset: () => void;
}

function Error({ reset }: Props) {
  return (
    <div className="h-screen flex-col w-screen bg-red-600 flex items-center justify-center">
      <h1 className="text-red-50 font-medium text-center px-4 text-4xl xs:text-5xl sm:text-7xl mb-8">
        Ha ocurrido un error inesperado
      </h1>
      <button
        onClick={() => reset()}
        className="bg-red-50 text-red-900 px-6 py-3 rounded-md text-2xl font-bold hover:bg-red-100 shadow-lg hover:shadow-xl transition duration-200"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}

export default Error;

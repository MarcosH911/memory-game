"use client";

import {
  FaLevelDownAlt,
  FaLevelUpAlt,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { HiMiniCheck, HiMiniXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  isFirstTime: boolean;
  levelChange: 1 | 0 | -1;
  isPlaying: boolean;
  correctHits: number;
  mistakes: number;
}

function PlayStartScreen({
  onClick,
  isFirstTime,
  levelChange,
  isPlaying,
  correctHits,
  mistakes,
}: Props) {
  return (
    <div
      className={twMerge(
        "visible absolute flex h-full w-full items-center justify-center transition-all duration-500",
        isPlaying && "invisible",
      )}
    >
      <div
        className={twMerge(
          "absolute z-10 h-full w-full opacity-100 backdrop-blur-sm transition duration-500",
          isPlaying && "opacity-0",
        )}
      ></div>
      <div
        className={twMerge(
          "z-10 flex h-full w-full flex-col items-center justify-center border-teal-300/30 bg-teal-100/70 opacity-100 shadow-2xl shadow-black/40 backdrop-blur-md transition duration-500 2xl:h-fit 2xl:w-fit 2xl:rounded-xl 2xl:border-2 2xl:px-40 2xl:py-20",
          isPlaying && "opacity-0",
        )}
      >
        {isFirstTime ? (
          <div className="flex flex-col items-center">
            <h1 className="-mt-8 mb-16 text-5xl font-bold text-teal-950">
              ¡Bienvenido!
            </h1>
            <div className="-mb-4 flex justify-center py-4">
              <div className="group relative">
                <button
                  onClick={onClick}
                  className="relative z-10 rounded-md border border-transparent px-16 py-4 text-3xl font-extrabold text-teal-50"
                >
                  Jugar
                </button>
                <div className="absolute inset-0 rounded-md border border-slate-800/60 bg-gradient-to-r from-lime-700 via-teal-700 to-blue-700 px-8 py-4 text-2xl font-extrabold text-teal-50 opacity-70 transition duration-200 active:shadow-sm group-hover:opacity-100"></div>
                <div className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-lime-400 via-teal-400 to-blue-400 opacity-70 blur-lg transition duration-200 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center gap-4 pb-4 sm:flex-row sm:gap-8">
              <div className="flex w-[16.5rem] items-center justify-center gap-2 rounded-full border border-green-700 bg-green-100/80 px-6 py-3 sm:w-fit">
                <span className="text-2xl font-semibold text-green-700">
                  <span className="font-bold">{correctHits}</span> Acierto
                  {correctHits === 1 ? "" : "s"}
                </span>
                <HiMiniCheck className="text-3xl text-green-700" />
              </div>
              <div className="flex w-[16.5rem] items-center justify-center gap-2 rounded-full border border-red-700 bg-red-100/80 px-6 py-3 sm:w-fit">
                <span className="text-2xl font-semibold text-red-700">
                  <span className="font-bold">{mistakes}</span> Fallo
                  {mistakes === 1 ? "" : "s"}
                </span>
                <HiMiniXMark className="text-3xl text-red-700" />
              </div>
            </div>
            <div>
              {levelChange === 1 ? (
                <div className="mb-20 flex w-[16.5rem] items-center justify-center gap-1 rounded-md border border-green-700 bg-green-600/90 py-3 sm:w-fit sm:px-[6.7rem]">
                  <FaLevelUpAlt className="text-xl text-green-50" />
                  <span className="text-xl font-semibold text-green-50">
                    Subes de nivel
                  </span>
                </div>
              ) : levelChange === -1 ? (
                <div className="mb-20 flex w-[16.5rem] items-center justify-center gap-1 rounded-md border border-red-700 bg-red-600/90 py-3 sm:w-fit sm:px-[6.7rem]">
                  <FaLevelDownAlt className="text-xl text-red-50" />
                  <span className="text-xl font-semibold text-red-50">
                    Bajas de nivel
                  </span>
                </div>
              ) : (
                <div className="mb-16 mt-4 flex w-[16.5rem] items-center justify-center gap-1 rounded-md border border-teal-700 bg-teal-600/90 py-3 sm:mb-20 sm:w-fit sm:px-[6.7rem]">
                  <FaLongArrowAltRight className="text-xl text-teal-50" />
                  <span className="text-xl font-semibold text-teal-50">
                    Mantienes el nivel
                  </span>
                </div>
              )}
            </div>
            <div className="-mb-4 flex justify-center py-4">
              <div className="group relative">
                <button
                  onClick={onClick}
                  className="relative z-10 rounded-md border border-transparent px-8 py-4 text-3xl font-extrabold text-teal-50"
                >
                  Volver a jugar
                </button>
                <div className="absolute inset-0 rounded-md border border-slate-800/60 bg-gradient-to-r from-lime-700 via-teal-700 to-blue-700 px-8 py-4 text-2xl font-extrabold text-teal-950 opacity-70 transition duration-200 active:shadow-sm group-hover:opacity-100"></div>
                <div className="absolute -inset-4 -z-10 rounded-lg bg-gradient-to-r from-lime-400 via-teal-400 to-blue-400 opacity-70 blur-lg transition duration-200 group-hover:opacity-90"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PlayStartScreen;

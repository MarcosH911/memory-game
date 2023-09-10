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

function StartPlayingScreen({
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
        "absolute flex h-full w-full items-center justify-center",
        isPlaying
          ? "animate-hide-start-playing-screen"
          : "animate-show-start-playing-screen",
      )}
    >
      <div
        className={twMerge(
          "absolute h-full w-full backdrop-blur-sm z-10",
          isPlaying
            ? "animate-fade-out-start-playing-screen"
            : "animate-fade-in-start-playing-screen",
        )}
      ></div>
      <div
        className={twMerge(
          "z-10 flex flex-col rounded-xl border-2 border-teal-100/70 bg-teal-100/70 shadow-md backdrop-blur-md py-20 px-40",
          isPlaying
            ? "animate-fade-out-start-playing-screen"
            : "animate-fade-in-start-playing-screen",
        )}
      >
        {isFirstTime ? (
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-bold text-teal-950 mb-16 -mt-8">
              ¡Bienvenido!
            </h1>
            <div className="flex justify-center py-4 -mb-4">
              <div className="relative group">
                <button
                  onClick={onClick}
                  className="relative rounded-md z-10 text-3xl font-extrabold text-teal-50 px-16 py-4 border border-transparent"
                >
                  Jugar
                </button>
                <div className="absolute inset-0 rounded-md border border-slate-800/60 px-8 py-4 text-2xl font-extrabold text-teal-50 active:shadow-sm bg-gradient-to-r from-lime-700 via-teal-700 to-blue-700 opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <div className="-z-10 absolute -inset-4 bg-gradient-to-r from-lime-400 via-teal-400 to-blue-400 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition duration-200"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-8 pb-4">
              <div className="flex items-center bg-green-100/80 border-green-700 border px-6 py-3 rounded-full gap-2">
                <span className="text-2xl font-semibold text-green-700">
                  <span className="font-bold">{correctHits}</span> Acierto
                  {correctHits === 1 ? "" : "s"}
                </span>
                <HiMiniCheck className="text-3xl text-green-700" />
              </div>
              <div className="flex items-center bg-red-100/80 border-red-700 border px-6 py-3 rounded-full gap-2">
                <span className="text-2xl font-semibold text-red-700">
                  <span className="font-bold">{mistakes}</span> Fallo
                  {mistakes === 1 ? "" : "s"}
                </span>
                <HiMiniXMark className="text-3xl text-red-700" />
              </div>
            </div>
            <div>
              {levelChange === 1 ? (
                <div className="flex items-center justify-center gap-1 bg-green-600/90 border border-green-700 py-3 rounded-md mb-20">
                  <FaLevelUpAlt className="text-xl text-green-50" />
                  <span className="text-xl font-semibold text-green-50">
                    Subes de nivel
                  </span>
                </div>
              ) : levelChange === -1 ? (
                <div className="flex items-center justify-center gap-1 bg-red-600/90 border border-red-700 py-3 rounded-md mb-20">
                  <FaLevelDownAlt className="text-xl text-red-50" />
                  <span className="text-xl font-semibold text-red-50">
                    Bajas de nivel
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 bg-teal-600/90 border border-teal-700 py-3 rounded-md mb-20">
                  <FaLongArrowAltRight className="text-xl text-teal-50" />
                  <span className="text-xl font-semibold text-teal-50">
                    Mantienes el nivel
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-center py-4 -mb-4">
              <div className="relative group">
                <button
                  onClick={onClick}
                  className="relative rounded-md z-10 text-3xl font-extrabold text-teal-50 px-8 py-4 border border-transparent"
                >
                  Volver a jugar
                </button>
                <div className="absolute inset-0 rounded-md border border-slate-800/60 px-8 py-4 text-2xl font-extrabold text-teal-950 active:shadow-sm bg-gradient-to-r from-lime-700 via-teal-700 to-blue-700 opacity-70 group-hover:opacity-100 transition duration-200"></div>
                <div className="-z-10 absolute -inset-4 bg-gradient-to-r from-lime-400 via-teal-400 to-blue-400 rounded-lg blur-lg opacity-70 group-hover:opacity-90 transition duration-200"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StartPlayingScreen;

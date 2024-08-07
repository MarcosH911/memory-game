"use client";

import { useContext } from "react";
import { HiMiniXMark } from "react-icons/hi2";

import PlayTutorialButtons from "../PlayTutorialButtons";
import TutorialContext from "@/contexts/TutorialContext";

interface Props {
  children: React.ReactNode;
  step: number;
}

function PlayTutorialStepWrapper({ children, step }: Props) {
  const { hasPlayedTutorial, setIsOpen } = useContext(TutorialContext);

  const handleClose = () => {
    setIsOpen && setIsOpen(false);
  };

  return (
    <div className="relative flex h-[100vh] w-screen items-center justify-center bg-cyan-50 py-4 text-teal-950 supports-[height:100dvh]:h-[100dvh] sm:h-[95dvh] sm:w-[32.5rem] sm:supports-[height:95dvh]:h-[95dvh] h-md:py-6 h-lg:py-8">
      <div
        style={{ backfaceVisibility: "hidden" }}
        className="flex h-full w-full flex-col px-4 xs:w-[30rem] xs:px-12"
      >
        {hasPlayedTutorial && (
          <button
            onClick={handleClose}
            tabIndex={-1}
            className="absolute right-4 top-4 rounded-full p-1 text-3xl text-teal-900 transition duration-200 hover:bg-teal-600/20"
          >
            <HiMiniXMark />
          </button>
        )}
        <div>
          <h1 className="text-4xl font-bold">Instrucciones</h1>
          <h2 className="mb-4 text-lg font-semibold text-teal-900 h-sm:mb-6">
            {step <= 4 && `Paso ${step}`}
            {(step === 5 || step === 6) && `Ejemplo ${step}`}
            {step === 7 && "Ayuda"}
            {step === 8 && "Vídeo"}
          </h2>
        </div>
        <div className="flex h-full flex-col pb-4 h-md:pb-10">{children}</div>
        <PlayTutorialButtons step={step} />
      </div>
    </div>
  );
}

export default PlayTutorialStepWrapper;

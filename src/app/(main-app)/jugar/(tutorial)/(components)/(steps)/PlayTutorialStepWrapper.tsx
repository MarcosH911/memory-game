"use client";

import { useContext } from "react";
import PlayTutorialButtons from "../PlayTutorialButtons";
import TutorialContext from "@/contexts/TutorialContext";
import { HiMiniXMark } from "react-icons/hi2";

interface Props {
  children: React.ReactNode;
  step: number;
}

function PlayTutorialStepWrapper({ children, step }: Props) {
  const { hasPlayedTutorial, setIsOpen, setStep } = useContext(TutorialContext);

  const handleClose = () => {
    setIsOpen && setIsOpen(false);
  };

  return (
    <div className="relative flex h-[95vh] max-w-[32.5rem] flex-col bg-cyan-50 px-12 py-4 text-teal-950 h-md:py-6 h-lg:py-8">
      {hasPlayedTutorial && (
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-1 text-3xl text-teal-900 transition duration-200 hover:bg-teal-600/20"
        >
          <HiMiniXMark />
        </button>
      )}
      <div>
        <h1 className="text-4xl font-bold">Instrucciones</h1>
        <h2 className="mb-4 text-lg font-semibold text-teal-900 h-sm:mb-6">
          {step < 5 ? `Paso ${step}` : `Ejemplo ${step - 4}`}
        </h2>
      </div>
      <div className="flex h-full flex-col pb-4 h-md:pb-10">{children}</div>
      <PlayTutorialButtons step={step} />
    </div>
  );
}

export default PlayTutorialStepWrapper;

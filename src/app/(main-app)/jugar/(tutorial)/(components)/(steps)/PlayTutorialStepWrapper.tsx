"use client";

import StepContext from "@/contexts/StepContext";
import { useContext } from "react";
import PlayTutorialButtons from "../PlayTutorialButtons";

interface Props {
  children: React.ReactNode;
}

function PlayTutorialStepWrapper({ children }: Props) {
  const { step } = useContext(StepContext);

  return (
    <div className="flex h-[95vh] w-[32.5rem] flex-col bg-cyan-50 px-12 py-4 text-teal-950 h-md:py-6 h-lg:py-8">
      <div>
        <h1 className="text-4xl font-bold">Instrucciones</h1>
        <h2 className="mb-4 text-lg font-semibold text-teal-900 h-sm:mb-6">
          {step < 5 ? `Paso ${step}` : `Ejemplo ${step - 4}`}
        </h2>
      </div>
      <div className="flex h-full flex-col pb-4 h-md:pb-10">{children}</div>
      <PlayTutorialButtons />
    </div>
  );
}

export default PlayTutorialStepWrapper;

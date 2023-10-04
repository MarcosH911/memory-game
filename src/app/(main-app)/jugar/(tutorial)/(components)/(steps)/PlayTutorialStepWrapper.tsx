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
    <div className="flex h-full flex-col py-8 text-teal-950">
      <div>
        <h1 className="text-4xl font-bold">Instrucciones</h1>
        <h2 className="mb-6 text-lg font-semibold text-teal-900">
          Paso {step}
        </h2>
      </div>
      <div className="flex h-full flex-col pb-4 h-md:pb-10">{children}</div>
      <PlayTutorialButtons />
    </div>
  );
}

export default PlayTutorialStepWrapper;

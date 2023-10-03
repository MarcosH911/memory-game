"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import StepContext from "@/contexts/StepContext";
import PlayTutorialStep1 from "./(components)/(steps)/PlayTutorialStep1";
import PlayTutorialStep2 from "./(components)/(steps)/PlayTutorialStep2";
import PlayTutorialStep3 from "./(components)/(steps)/PlayTutorialStep3";
import PlayTutorialStep4 from "./(components)/(steps)/PlayTutorialStep4";

const totalSteps = 4;

function PlayTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <StepContext.Provider value={{ step, setStep, totalSteps }}>
      <Dialog.Root open={true} onOpenChange={() => setIsOpen((open) => !open)}>
        <Dialog.Trigger />
        <Dialog.Overlay />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 border-slate-200 bg-cyan-50 px-4 xl:h-[50rem] xl:w-[32.5rem] xl:rounded-xl xl:border xl:px-12 xl:shadow-2xl">
          {step === 1 && <PlayTutorialStep1 />}
          {step === 2 && <PlayTutorialStep2 />}
          {step === 3 && <PlayTutorialStep3 />}
          {step === 4 && <PlayTutorialStep4 />}
        </Dialog.Content>
      </Dialog.Root>
    </StepContext.Provider>
  );
}

export default PlayTutorial;

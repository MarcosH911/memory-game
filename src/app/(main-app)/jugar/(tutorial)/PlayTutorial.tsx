"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import StepContext from "@/contexts/StepContext";
import PlayTutorialStep1 from "./(components)/(steps)/PlayTutorialStep1";
import PlayTutorialStep2 from "./(components)/(steps)/PlayTutorialStep2";
import PlayTutorialStep3 from "./(components)/(steps)/PlayTutorialStep3";
import PlayTutorialStep4 from "./(components)/(steps)/PlayTutorialStep4";
import PlayTutorialStep5 from "./(components)/(steps)/PlayTutorialStep5";
import PlayTutorialStep6 from "./(components)/(steps)/PlayTutorialStep6";

const totalSteps = 6;

function PlayTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(5);

  return (
    <StepContext.Provider value={{ step, setStep, totalSteps }}>
      <Dialog.Root open={true} onOpenChange={() => setIsOpen((open) => !open)}>
        <Dialog.Trigger />
        <Dialog.Overlay />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[95vh] w-[32.5rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-cyan-50 px-12 shadow-2xl">
          {step === 1 && <PlayTutorialStep1 />}
          {step === 2 && <PlayTutorialStep2 />}
          {step === 3 && <PlayTutorialStep3 />}
          {step === 4 && <PlayTutorialStep4 />}
          {step === 5 && <PlayTutorialStep5 />}
          {step === 6 && <PlayTutorialStep6 />}
        </Dialog.Content>
      </Dialog.Root>
    </StepContext.Provider>
  );
}

export default PlayTutorial;

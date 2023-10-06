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
  const [step, setStep] = useState(1);

  return (
    <StepContext.Provider value={{ step, setStep, totalSteps }}>
      <Dialog.Root open={true} onOpenChange={() => setIsOpen((open) => !open)}>
        <Dialog.Trigger />
        <Dialog.Overlay />
        <Dialog.Content asChild>
          <div className="fixed left-1/2 top-1/2 z-50 flex h-[95vh] w-[32.5rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-slate-200 shadow-2xl">
            <div
              style={{ transform: `translateX(${(step - 1) * -32.5}rem)` }}
              className="flex transition duration-300"
            >
              <PlayTutorialStep1 />
              <PlayTutorialStep2 />
              <PlayTutorialStep3 />
              <PlayTutorialStep4 />
              <PlayTutorialStep5 />
              <PlayTutorialStep6 />
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </StepContext.Provider>
  );
}

export default PlayTutorial;

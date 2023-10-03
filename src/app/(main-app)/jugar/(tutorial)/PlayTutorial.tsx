"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import PlayTutorialStep1 from "./(components)/PlayTutorialStep1";
import PlayTutorialStep2 from "./(components)/PlayTutorialStep2";

const totalSteps = 4;

function PlayTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <Dialog.Root open={true} onOpenChange={() => setIsOpen((open) => !open)}>
      <Dialog.Trigger />
      <Dialog.Overlay />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 xl:h-[46.5rem] xl:w-[40rem] -translate-x-1/2 -translate-y-1/2 xl:rounded-xl xl:border border-slate-200 bg-cyan-50 xl:shadow-2xl h-full w-full px-4">
        {step === 1 && (
          <PlayTutorialStep1 setStep={setStep} totalSteps={totalSteps} />
        )}
        {step === 2 && (
          <PlayTutorialStep2 setStep={setStep} totalSteps={totalSteps} />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default PlayTutorial;

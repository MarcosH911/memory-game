"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import PlayTutorialStep1 from "./(components)/PlayTutorialStep1";

function PlayTutorial() {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <Dialog.Root open={true} onOpenChange={() => setIsOpen((open) => !open)}>
      <Dialog.Trigger />
      <Dialog.Overlay />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 h-[46.5rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-cyan-50 shadow-2xl">
        {step === 1 && <PlayTutorialStep1 setStep={setStep} />}
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default PlayTutorial;

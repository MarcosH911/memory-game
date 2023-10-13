"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";

import TutorialContext from "@/contexts/TutorialContext";
import PlayTutorialStep1 from "./(components)/(steps)/PlayTutorialStep1";
import PlayTutorialStep2 from "./(components)/(steps)/PlayTutorialStep2";
import PlayTutorialStep3 from "./(components)/(steps)/PlayTutorialStep3";
import PlayTutorialStep4 from "./(components)/(steps)/PlayTutorialStep4";
import PlayTutorialStep5 from "./(components)/(steps)/PlayTutorialStep5";
import PlayTutorialStep6 from "./(components)/(steps)/PlayTutorialStep6";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

const totalSteps = 6;

function PlayTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [hasPlayedTutorial, setHasPlayedTutorial] = useState(true);

  const searchParams = useSearchParams();
  const isPlaying = searchParams.has("playing", "true");

  useEffect(() => {
    setHasPlayedTutorial(!!localStorage.getItem("hasPlayedTutorial"));
    if (!hasPlayedTutorial) {
      setIsOpen(true);
    }
  }, [hasPlayedTutorial]);

  return (
    <TutorialContext.Provider
      value={{
        step,
        setStep,
        totalSteps,
        setIsOpen,
        hasPlayedTutorial: hasPlayedTutorial,
        setHasPlayedTutorial,
      }}
    >
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          !open && hasPlayedTutorial && setIsOpen(false);
        }}
      >
        <Dialog.Trigger asChild>
          <button
            onClick={() => {
              setStep(1);
              setIsOpen(true);
            }}
            className={twMerge(
              "absolute right-5 top-5 z-30 rounded-full p-1 text-3xl text-teal-900 opacity-100 transition duration-300 hover:bg-teal-600/20 hover:text-teal-950",
              isPlaying && "translate-x-10 opacity-0",
            )}
          >
            <RxQuestionMarkCircled />
          </button>
        </Dialog.Trigger>
        <Dialog.Overlay className="fixed inset-0 z-50 animate-show-modal-overlay bg-black/10 backdrop-blur-sm data-[state=closed]:animate-fade-out" />
        <Dialog.Content asChild>
          <div className="fixed left-1/2 top-1/2 z-50 flex h-[100dvh] w-screen -translate-x-1/2 -translate-y-1/2 animate-show-modal overflow-hidden rounded-xl border border-slate-200 shadow-2xl data-[state=closed]:animate-fade-out sm:h-[95dvh] sm:w-[32.5rem]">
            <div
              style={{
                transform: `translateX(-${((step - 1) / totalSteps) * 100}%)`,
              }}
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
    </TutorialContext.Provider>
  );
}

export default PlayTutorial;

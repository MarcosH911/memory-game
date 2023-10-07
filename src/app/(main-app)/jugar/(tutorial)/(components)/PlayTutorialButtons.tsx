import TutorialContext from "@/contexts/TutorialContext";
import { useContext } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface Props {
  step: number;
}

function PlayTutorialButtons({ step }: Props) {
  const { setStep, totalSteps, setIsOpen, setHasPlayedTutorial } =
    useContext(TutorialContext);

  const handleSetStep = (change: number) => {
    if (step === totalSteps && change === 1) {
      setIsOpen && setIsOpen(false);
      localStorage.setItem("hasPlayedTutorial", "true");
      setHasPlayedTutorial && setHasPlayedTutorial(true);
    } else {
      setStep && setStep((step) => step + change);
    }
  };

  return (
    <div className="mt-auto flex items-center justify-center gap-4">
      {step > 1 && (
        <button
          onClick={() => handleSetStep(-1)}
          className="flex items-center justify-center gap-1.5 rounded-md bg-teal-600 px-6 py-2 text-lg font-semibold text-teal-50 shadow-lg transition duration-150 hover:bg-teal-700 hover:shadow-xl active:shadow-none"
        >
          <HiArrowLeft />
          <span>
            {step - 1 <= 4 ? `Paso ${step - 1}` : `Ejemplo ${step - 5}`}
          </span>
        </button>
      )}
      {step <= totalSteps && (
        <button
          onClick={() => handleSetStep(1)}
          className={twMerge(
            "flex items-center justify-center gap-1.5 rounded-md bg-teal-600 px-6 py-2 text-lg font-semibold text-teal-50 shadow-lg transition duration-150 hover:bg-teal-700 hover:shadow-xl active:shadow-none",
            step === totalSteps &&
              "bg-teal-300 font-bold text-teal-900 hover:bg-teal-400",
          )}
        >
          <span>
            {step + 1 <= 4
              ? `Paso ${step + 1}`
              : step < totalSteps
              ? `Ejemplo ${step - 3}`
              : `¡Comenzar!`}
          </span>
          {step < totalSteps && <HiArrowRight />}
        </button>
      )}
    </div>
  );
}

export default PlayTutorialButtons;

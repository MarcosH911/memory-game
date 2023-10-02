import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

interface Props {
  step: number;
  setStep: (step: number) => void;
}

function PlayTutorialButtons({ step, setStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-4">
      {step > 1 && (
        <button className="flex items-center justify-center gap-1.5 rounded-md bg-teal-600 px-6 py-2 text-lg font-semibold text-teal-50 shadow-lg transition duration-150 hover:bg-teal-700 hover:shadow-xl active:shadow-none">
          <HiArrowLeft />
          <span>Paso {step - 1}</span>
        </button>
      )}
      <button className="flex items-center justify-center gap-1.5 rounded-md bg-teal-600 px-6 py-2 text-lg font-semibold text-teal-50 shadow-lg transition duration-150 hover:bg-teal-700 hover:shadow-xl active:shadow-none">
        <span>Paso {step + 1}</span>
        <HiArrowRight />
      </button>
    </div>
  );
}

export default PlayTutorialButtons;
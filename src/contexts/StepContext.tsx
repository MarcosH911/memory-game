import { createContext } from "react";

const StepContext = createContext<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>> | null;
  totalSteps: number;
}>({ step: 1, setStep: null, totalSteps: 1 });

export default StepContext;

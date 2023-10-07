import { createContext } from "react";

const TutorialContext = createContext<{
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>> | null;
  totalSteps: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | null;
  hasPlayedTutorial: boolean;
  setHasPlayedTutorial: React.Dispatch<React.SetStateAction<boolean>> | null;
}>({
  step: 1,
  setStep: null,
  totalSteps: 1,
  setIsOpen: null,
  hasPlayedTutorial: true,
  setHasPlayedTutorial: null,
});

export default TutorialContext;

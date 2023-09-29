import { HiMiniInformationCircle, HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface Props {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

function TeacherMessageBox({ errorMessage, setErrorMessage }: Props) {
  return (
    <div
      className={twMerge(
        "relative mt-8 -mb-8 flex items-center rounded border border-red-400 bg-red-50 px-2 py-2 text-xs text-red-700",
        !errorMessage && "hidden",
      )}
    >
      <HiMiniInformationCircle className="mr-1 text-lg" />
      <span className="font-bold">Info:&nbsp;</span>
      <span>{errorMessage}</span>
      <button
        type="button"
        onClick={() => setErrorMessage("")}
        className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-red-200"
      >
        <HiXMark />
      </button>
    </div>
  );
}

export default TeacherMessageBox;

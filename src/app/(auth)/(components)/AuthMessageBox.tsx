import { HiMiniInformationCircle, HiXMark } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

interface Props {
  errorMessage: string;
  successMessage?: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setSuccessMessage?: React.Dispatch<React.SetStateAction<string>>;
}

function AuthMessageBox({
  errorMessage,
  successMessage,
  setErrorMessage,
  setSuccessMessage,
}: Props) {
  return (
    <>
      <div
        className={twMerge(
          "relative -mt-6 mb-6 flex items-center rounded border border-red-400 bg-red-50 px-2 py-2 text-xs text-red-700",
          !errorMessage && "hidden",
        )}
      >
        <HiMiniInformationCircle className="mr-1 text-lg" />
        <span className="font-bold">Info:&nbsp;</span>
        <span>{errorMessage}</span>
        <button
          type="button"
          onClick={() => {
            setErrorMessage("");
            setSuccessMessage && setSuccessMessage("");
          }}
          className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-red-200"
        >
          <HiXMark />
        </button>
      </div>

      <div
        className={twMerge(
          "relative -mt-6 mb-6 flex items-center rounded border border-teal-400 bg-teal-50 px-2 py-2 text-xs text-teal-700",
          !successMessage && "hidden",
        )}
      >
        <HiMiniInformationCircle className="mr-1 text-lg" />
        <span className="font-bold">Info:&nbsp;</span>
        <span>{successMessage}</span>
        <button
          type="button"
          onClick={() => {
            setSuccessMessage && setSuccessMessage("");
          }}
          className="absolute right-1 rounded-full p-1 text-xl transition hover:bg-teal-200"
        >
          <HiXMark />
        </button>
      </div>
    </>
  );
}

export default AuthMessageBox;

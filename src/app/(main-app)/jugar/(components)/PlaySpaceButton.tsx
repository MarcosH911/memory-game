import { twMerge } from "tailwind-merge";

interface Props {
  onClick: () => void;
  spaceButtonRef: React.RefObject<HTMLButtonElement>;
  isSpacePressed: boolean;
}

function PlaySpaceButton({ onClick, spaceButtonRef, isSpacePressed }: Props) {
  return (
    <button
      onClick={onClick}
      ref={spaceButtonRef}
      className={twMerge(
        "relative -z-10 h-28 w-full max-w-3xl -translate-y-2 rounded-lg border-4 border-slate-600 bg-slate-100 shadow-xl shadow-black/60 transition duration-300 focus:outline-none",
        isSpacePressed &&
          "translate-y-0 bg-slate-200 shadow-sm shadow-black/30",
      )}
    >
      <div className="absolute right-1/2 top-5 h-1.5 w-1/6 translate-x-1/2 rounded-full bg-slate-600"></div>
    </button>
  );
}

export default PlaySpaceButton;

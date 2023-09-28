import { twMerge } from "tailwind-merge";

import Spinner from "@/components/Spinner";

interface Props {
  disabled: boolean;
  text: string;
}

function AuthSubmitButton({ disabled, text }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="relative mx-auto mt-4 w-auto rounded-lg bg-teal-800 px-10 py-2 text-lg font-semibold text-white shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400 disabled:cursor-wait"
    >
      <Spinner visible={disabled} size="2xl" />
      <span className={twMerge("visible", disabled && "invisible")}>
        {text}
      </span>
    </button>
  );
}

export default AuthSubmitButton;

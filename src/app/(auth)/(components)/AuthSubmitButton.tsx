interface Props {
  disabled: boolean;
  text: string;
}

function AuthSubmitButton({ disabled, text }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="m-auto w-auto rounded-lg bg-teal-800 px-10 py-2 text-lg font-semibold text-white shadow-lg transition hover:bg-teal-900 active:shadow-none disabled:bg-slate-400"
    >
      {text}
    </button>
  );
}

export default AuthSubmitButton;

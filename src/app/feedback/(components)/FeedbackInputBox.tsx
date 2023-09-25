"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { BsCheck, BsCheckLg, BsPlus } from "react-icons/bs";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { HiMiniCheck, HiMiniPlus, HiPlus } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

function FeedbackInputBox() {
  const textRef = useRef<string>("");
  const [isBugTagSelected, setIsBugTagSelected] = useState(false);
  const [isSuggestionTagSelected, setIsSuggestionTagSelected] = useState(false);

  const handleReload = (e: BeforeUnloadEvent) => {
    if (textRef.current !== "") {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleReload);

    return () => window.removeEventListener("beforeunload", handleReload);
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (textRef.current === "") return;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg py-6 pl-16 pr-12 bg-white rounded-2xl"
    >
      <span
        role="textbox"
        onInput={(e) => (textRef.current = e.currentTarget.innerText)}
        spellCheck="true"
        contentEditable
        className="text-lg placeholder:text-slate-400 focus-visible:outline-none pt-2 pb-6 w-full block resize-y empty:before:text-slate-400 empty:before:content-['Escribe\auna\asugerencia'] cursor-text text-teal-950"
      ></span>

      <hr className="border-slate-200" />

      <div className="flex w-full justify-between items-center mt-4 ">
        <div className="flex items-center justify-center gap-5">
          <button
            onClick={() => setIsBugTagSelected((selected) => !selected)}
            className={twMerge(
              "flex items-center justify-center gap-0.5 uppercase text-xs border-red-600 border-2 rounded-full pl-1 pr-1.5 py-0.5 font-bold text-red-600 transition duration-100",
              isBugTagSelected && "bg-red-600 text-red-50",
            )}
          >
            {isBugTagSelected ? (
              <HiMiniCheck className="text-lg" />
            ) : (
              <HiMiniPlus className="text-lg" />
            )}
            <span>Error</span>
          </button>
          <button
            onClick={() => setIsSuggestionTagSelected((selected) => !selected)}
            className={twMerge(
              "flex items-center justify-center gap-0.5 uppercase text-xs border-blue-600 border-2 rounded-full pl-1 pr-1.5 py-0.5 font-bold text-blue-600 transition duration-100",
              isSuggestionTagSelected && "bg-blue-600 text-blue-50",
            )}
          >
            {isSuggestionTagSelected ? (
              <HiMiniCheck className="text-lg" />
            ) : (
              <HiMiniPlus className="text-lg" />
            )}
            <span>Sugerencia</span>
          </button>
        </div>
        <button
          type="submit"
          className="bg-teal-600 px-5 py-1.5 rounded-lg font-bold text-lg text-teal-50 shadow-md hover:bg-teal-700 hover:shadow-lg transition duration-200"
        >
          Publicar
        </button>
      </div>
    </form>
  );
}

export default FeedbackInputBox;

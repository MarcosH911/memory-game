"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { HiMiniCheck, HiMiniPlus, HiPlus } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

function FeedbackInputBox() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const isBugTagSelected = tags.includes("bug");
  const isSuggestionTagSelected = tags.includes("suggestion");

  const handleReload = (e: BeforeUnloadEvent) => {
    if (text !== "") {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") return;

    if (text.length > 500) {
      // TODO: handle warning
      return;
    }

    fetch("/api/feedback", {
      method: "post",
      body: JSON.stringify({
        text,
        tags,
      }),
    });
  };

  const handleSetTags = (newTag: string) => {
    setTags((tags) =>
      tags.includes(newTag)
        ? tags.filter((tag) => tag !== newTag)
        : [...tags, "bug"]
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleReload);

    return () => window.removeEventListener("beforeunload", handleReload);
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg pl-16 pr-12 bg-white rounded-2xl group"
    >
      <span
        role="textbox"
        onInput={(e) => setText(e.currentTarget.innerText)}
        spellCheck="true"
        contentEditable
        className="text-lg placeholder:text-slate-400 focus-visible:outline-none py-8 w-full block resize-y empty:before:text-slate-400 empty:before:content-['Escribe\auna\asugerencia'] cursor-text text-teal-950"
      ></span>

      <div
        className={twMerge(
          "hidden group-focus-within:block",
          text !== "" && "block"
        )}
      >
        <hr className="border-slate-200" />

        <div className="flex w-full justify-between items-center mt-4 mb-6">
          <div className="flex items-center justify-center gap-5">
            <button
              onClick={() => handleSetTags("bug")}
              className={twMerge(
                "flex items-center justify-center gap-0.5 uppercase text-xs border-red-600 border-2 rounded-full pl-1 pr-1.5 py-0.5 font-bold text-red-600 transition duration-100",
                isBugTagSelected && "bg-red-600 text-red-50"
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
              onClick={() => handleSetTags("suggestion")}
              className={twMerge(
                "flex items-center justify-center gap-0.5 uppercase text-xs border-blue-600 border-2 rounded-full pl-1 pr-1.5 py-0.5 font-bold text-blue-600 transition duration-100",
                isSuggestionTagSelected && "bg-blue-600 text-blue-50"
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
      </div>
    </form>
  );
}

export default FeedbackInputBox;

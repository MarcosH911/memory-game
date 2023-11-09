"use client";

import type { FormEvent } from "react";

import toast from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiMiniCheck, HiMiniPlus } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";
import { useRouter } from "next/navigation";

import FeedbackInputMessageBox from "./FeedbackInputMessageBox";
import Spinner from "@/components/Spinner";

function FeedbackInputBox() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const inputRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();

  const isBugTagSelected = tags.includes("bug");
  const isSuggestionTagSelected = tags.includes("suggestion");

  const handleReload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (text !== "") {
        e.preventDefault();
        e.returnValue = "";
      }
    },
    [text],
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    setErrorMessage("");
    e.preventDefault();

    if (text.length > 1000) {
      setErrorMessage("El mensaje debe tener menos de 1000 carácteres");
      setIsLoading(false);
      return;
    } else if (text.length < 10) {
      setErrorMessage("El mensaje debe tener al menos 10 carácteres");
      setIsLoading(false);
      return;
    }

    const insertFeedbackResponse = await fetch(
      "/api/feedback/insert-feedback",
      {
        method: "post",
        body: JSON.stringify({
          text,
          tags,
        }),
      },
    );

    if (insertFeedbackResponse.status === 200) {
      setText("");
      setTags([]);
      inputRef.current!.textContent = "";
      toast.success("Sugerencia añadida correctamente");
      (document.activeElement as HTMLElement).blur();
      router.refresh();
    } else {
      toast.error("Ha ocurrido un error inesperado");
    }
    setIsLoading(false);
  };

  const handleSetTags = (e: React.MouseEvent, newTag: string) => {
    e.preventDefault();

    setTags((tags) =>
      tags.includes(newTag)
        ? tags.filter((tag) => tag !== newTag)
        : [...tags, newTag],
    );
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleReload);

    return () => window.removeEventListener("beforeunload", handleReload);
  }, [handleReload]);

  return (
    <form
      onSubmit={handleSubmit}
      className="group rounded-2xl bg-white pl-10 pr-6 shadow-lg xs:pl-12 sm:pl-16 sm:pr-12"
    >
      <span
        role="textbox"
        onInput={(e) => setText(e.currentTarget.innerText)}
        spellCheck="true"
        contentEditable={!isLoading}
        ref={inputRef}
        aria-disabled={isLoading}
        className="block w-full cursor-text resize-y py-8 text-base text-teal-950 placeholder:text-slate-400 empty:before:text-slate-400 empty:before:content-['Escribe\auna\asugerencia'] focus-visible:outline-none aria-disabled:cursor-wait xs:text-lg"
      ></span>

      <div
        className={twMerge(
          "hidden group-focus-within:block",
          text !== "" && "block",
        )}
      >
        <hr className="border-slate-200" />

        <FeedbackInputMessageBox
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />

        <div className="mb-6 mt-4 flex w-full flex-col justify-between gap-4 xs:flex-row xs:items-center xs:gap-0">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <button
              onClick={(e) => handleSetTags(e, "bug")}
              className={twMerge(
                "flex items-center justify-center gap-0.5 rounded-full border-2 border-red-600 py-0.5 pl-1 pr-1.5 text-xs font-bold uppercase text-red-600 transition duration-100",
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
              onClick={(e) => handleSetTags(e, "suggestion")}
              className={twMerge(
                "flex items-center justify-center gap-0.5 rounded-full border-2 border-blue-600 py-0.5 pl-1 pr-1.5 text-xs font-bold uppercase text-blue-600 transition duration-100",
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
            className={twMerge(
              "relative rounded-lg bg-teal-600 px-5 py-1.5 text-lg font-bold text-teal-50 shadow-md transition duration-200 hover:bg-teal-700 hover:shadow-lg",
              isLoading && "cursor-wait bg-slate-400 hover:bg-slate-400",
            )}
          >
            <Spinner visible={isLoading} size="2xl" />
            <span className={twMerge("visible", isLoading && "invisible")}>
              Publicar
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default FeedbackInputBox;

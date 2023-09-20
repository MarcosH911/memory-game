"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MdOutlineFeedback } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function FeedbackButton() {
  const searchParams = useSearchParams();
  const isPlaying = searchParams.has("playing", "true");

  return (
    <Link href={"/feedback"}>
      <button
        className={twMerge(
          "visible fixed bottom-4 right-4 z-50 flex translate-y-0 items-center justify-center gap-2 rounded-full bg-teal-700 p-4 opacity-100 shadow-lg shadow-black/40 transition duration-200 hover:bg-teal-800 active:shadow-sm active:shadow-black/40 active:duration-100 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4",
          isPlaying && "translate-y-20 opacity-0",
        )}
      >
        <MdOutlineFeedback className="text-2xl text-teal-50 sm:text-lg md:text-xl lg:text-2xl" />
        <span className="hidden font-semibold text-teal-50 sm:inline sm:text-base md:text-lg md:font-bold lg:text-xl">
          Danos Feedback
        </span>
      </button>
    </Link>
  );
}

export default FeedbackButton;

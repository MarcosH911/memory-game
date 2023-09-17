import Link from "next/link";
import { MdOutlineFeedback } from "react-icons/md";

function FeedbackButton() {
  return (
    <Link href={"/feedback"}>
      <button className="fixed bottom-4 right-4 z-50 flex items-center justify-center gap-2 rounded-full bg-teal-700 p-4 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 shadow-lg shadow-black/40 transition duration-200 hover:bg-teal-800 active:shadow-sm active:shadow-black/40 active:duration-100">
        <MdOutlineFeedback className="text-2xl sm:text-lg md:text-xl lg:text-2xl text-teal-50" />
        <span className="hidden sm:text-base sm:inline md:text-lg lg:text-xl font-semibold md:font-bold text-teal-50">
          Danos Feedback
        </span>
      </button>
    </Link>
  );
}

export default FeedbackButton;

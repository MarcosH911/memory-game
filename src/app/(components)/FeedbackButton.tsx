import Link from "next/link";
import { MdOutlineFeedback } from "react-icons/md";

function FeedbackButton() {
  return (
    <Link href={"/feedback"}>
      <button className="bg-teal-700 fixed right-4 bottom-4 z-50 px-8 py-4 flex items-center justify-center gap-2 rounded-full shadow-lg shadow-black/40 transition duration-200 hover:bg-teal-800 active:shadow-sm active:shadow-black/40 active:duration-100">
        <MdOutlineFeedback className="text-teal-50 text-2xl" />
        <span className="text-teal-50 text-xl font-bold">Danos Feedback</span>
      </button>
    </Link>
  );
}

export default FeedbackButton;

import Link from "next/link";
import { MdOutlineFeedback } from "react-icons/md";

function FeedbackButton() {
  return (
    <Link href={"/feedback"}>
      <button className="fixed bottom-4 right-4 z-50 flex items-center justify-center gap-2 rounded-full bg-teal-700 px-8 py-4 shadow-lg shadow-black/40 transition duration-200 hover:bg-teal-800 active:shadow-sm active:shadow-black/40 active:duration-100">
        <MdOutlineFeedback className="text-2xl text-teal-50" />
        <span className="text-xl font-bold text-teal-50">Danos Feedback</span>
      </button>
    </Link>
  );
}

export default FeedbackButton;

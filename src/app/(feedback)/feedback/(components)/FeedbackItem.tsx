import FeedbackLikes from "./FeedbackLikes";

interface Props {
  data: { id: string; text: string; likes: number };
}

function FeedbackItem({ data }: Props) {
  return (
    <div className="border border-teal-950/30 py-6 rounded-2xl pr-12 bg-teal-100 text-teal-950 shadow-md flex">
      <FeedbackLikes likes={data.likes} />
      <span className="text-lg">{data.text}</span>
    </div>
  );
}

export default FeedbackItem;

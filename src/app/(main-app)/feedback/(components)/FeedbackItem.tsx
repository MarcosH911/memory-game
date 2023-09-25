import FeedbackLikes from "./FeedbackLikes";

interface Props {
  data: { id: string; text: string; likes: number };
}

function FeedbackItem({ data }: Props) {
  return (
    <div className="flex rounded-2xl bg-white py-6 pr-12 text-teal-950 shadow-lg">
      <FeedbackLikes likes={data.likes} />
      <span className="text-lg">{data.text}</span>
    </div>
  );
}

export default FeedbackItem;
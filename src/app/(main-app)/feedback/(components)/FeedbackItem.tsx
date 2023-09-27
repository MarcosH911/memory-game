"use client";

import { useEffect } from "react";
import FeedbackVotes from "./FeedbackVotes";
import React from "react";
import FeedbackItemTag from "./FeedbackItemTag";

interface Props {
  data: { id: string; text: string; tags: string[]; votes: number };
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
}

function FeedbackItem({ data, setOffset, isLast }: Props) {
  const itemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef?.current || !isLast) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        setOffset((offset) => offset + 10);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(itemRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isLast, setOffset]);

  return (
    <div
      ref={itemRef}
      className="flex rounded-2xl bg-white py-6 pr-12 text-teal-950 relative shadow-lg"
    >
      <FeedbackVotes votes={data.votes} postId={data.id} />
      <div className="flex justify-center flex-col">
        <div className="flex items-center gap-1.5 absolute top-4">
          {data.tags.map((tag, index) => (
            <FeedbackItemTag key={index} tag={tag} />
          ))}
        </div>
        <span className="text-lg flex items-center">{data.text}</span>
      </div>
    </div>
  );
}

export default FeedbackItem;

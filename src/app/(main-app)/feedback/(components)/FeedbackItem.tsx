"use client";

import { useEffect } from "react";
import FeedbackVotes from "./FeedbackVotes";
import React from "react";
import FeedbackItemTag from "./FeedbackItemTag";

interface Props {
  data: { id: string; text: string; tags: string[]; votes: number };
  setSize: React.Dispatch<React.SetStateAction<number>>;
  isLast: boolean;
}

function FeedbackItem({ data, setSize, isLast }: Props) {
  const itemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef?.current || !isLast) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        setSize((size) => size + 1);
        observer.unobserve(entry.target);
      }
    });

    observer.observe(itemRef.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isLast, setSize]);

  return (
    <div
      ref={itemRef}
      className="relative flex rounded-2xl bg-white pr-6 text-teal-950 shadow-lg sm:pr-12"
    >
      <FeedbackVotes votes={data.votes} postId={data.id} />
      <div className="flex flex-col justify-center">
        <div className="absolute top-4 flex items-center gap-1.5">
          {data.tags?.map((tag, index) => (
            <FeedbackItemTag key={index} tag={tag} />
          ))}
        </div>
        <span className="flex items-center py-10 text-base xs:text-lg">
          {data.text}
        </span>
      </div>
    </div>
  );
}

export default FeedbackItem;

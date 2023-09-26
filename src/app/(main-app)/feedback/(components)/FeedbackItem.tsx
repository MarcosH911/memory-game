"use client";

import { useEffect } from "react";
import FeedbackVotes from "./FeedbackVotes";
import React from "react";

interface Props {
  data: { id: string; text: string; votes: number };
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
      className="flex rounded-2xl bg-white py-6 pr-12 text-teal-950 shadow-lg"
    >
      <FeedbackVotes votes={data.votes} postId={data.id} />
      <span className="text-lg flex items-center">{data.text}</span>
    </div>
  );
}

export default FeedbackItem;

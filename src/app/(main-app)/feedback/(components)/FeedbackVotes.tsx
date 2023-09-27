"use client";

import { useEffect, useRef, useState } from "react";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";

interface Props {
  votes: number;
  postId: string;
}

function FeedbackVotes({ votes, postId }: Props) {
  const [userVote, setUserVote] = useState<-1 | 0 | 1>(0);
  const [totalVotes, setTotalVotes] = useState<number>(votes);

  const isUpdatingVotes = useRef(false);

  const handleVote = async (vote: -1 | 1) => {
    if (isUpdatingVotes.current) return;
    isUpdatingVotes.current = true;
    await fetch("/api/feedback/insert-vote", {
      method: "post",
      body: JSON.stringify({
        postId,
        oldVote: userVote,
        newVote: userVote === vote ? 0 : vote,
      }),
    });

    setTotalVotes((totalVotes) => {
      if (userVote === vote) {
        return totalVotes - userVote;
      } else {
        return totalVotes - userVote + vote;
      }
    });
    setUserVote((userVote) => (userVote === vote ? 0 : vote));
    isUpdatingVotes.current = false;
  };

  useEffect(() => {
    const handleGetUserVote = async () => {
      const response = await fetch(
        `/api/feedback/get-user-vote?postId=${postId}`,
        {
          method: "get",
        },
      );

      const { data: vote } = await response.json();
      setUserVote(vote);
    };

    handleGetUserVote();
  }, [postId]);

  return (
    <div className="flex flex-col items-center justify-center px-3 text-lg font-semibold text-teal-800 xs:px-4 xs:text-xl sm:px-6">
      <div onClick={() => handleVote(1)} className="cursor-pointer">
        {userVote === 1 ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
      </div>
      <span className="text-lg font-bold text-teal-800">{totalVotes}</span>
      <div onClick={() => handleVote(-1)} className="cursor-pointer">
        {userVote === -1 ? <PiArrowFatDownFill /> : <PiArrowFatDownBold />}
      </div>
    </div>
  );
}

export default FeedbackVotes;

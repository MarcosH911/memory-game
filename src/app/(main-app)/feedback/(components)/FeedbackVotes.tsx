"use client";

import { useEffect, useState } from "react";
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

  const handleVote = async (vote: -1 | 1) => {
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
        return totalVotes + userVote;
      }
    });
    setUserVote(userVote === vote ? 0 : vote);
  };

  useEffect(() => {
    const handleGetUserVote = async () => {
      const response = await fetch(
        `/api/feedback/get-user-vote?postId=${postId}`,
        {
          method: "get",
        }
      );

      const { data: vote } = await response.json();
      setUserVote(vote);
    };

    handleGetUserVote();
  }, [postId]);

  return (
    <div className="px-6 flex items-center justify-center flex-col font-semibold">
      <div onClick={() => handleVote(1)} className="cursor-pointer">
        {userVote === 1 ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
      </div>
      <span>{totalVotes}</span>
      <div onClick={() => handleVote(-1)} className="cursor-pointer">
        {userVote === -1 ? <PiArrowFatDownFill /> : <PiArrowFatDownBold />}
      </div>
    </div>
  );
}

export default FeedbackVotes;

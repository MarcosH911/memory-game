"use client";

import { useRef, useState } from "react";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";
import useSWR from "swr";

interface Props {
  votes: number;
  postId: string;
}

function FeedbackVotes({ votes, postId }: Props) {
  const [totalVotes, setTotalVotes] = useState<number>(votes);
  const { data: userVote, mutate: mutateVote } = useSWR(
    `/api/feedback/get-user-vote?postId=${postId}`,
  );

  const isUpdatingVotes = useRef(false);

  const handleVote = async (vote: -1 | 1) => {
    if (isUpdatingVotes.current) return;
    isUpdatingVotes.current = true;
    await fetch("/api/feedback/insert-vote", {
      method: "post",
      body: JSON.stringify({
        postId,
        oldVote: userVote.data,
        newVote: userVote.data === vote ? 0 : vote,
      }),
    });

    setTotalVotes((totalVotes) => {
      if (userVote.data === vote) {
        return totalVotes - userVote.data;
      } else {
        return totalVotes - userVote.data + vote;
      }
    });
    mutateVote(userVote.data === vote ? 0 : vote);
    isUpdatingVotes.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center px-3 text-lg font-semibold text-teal-800 xs:px-4 xs:text-xl sm:px-6">
      <div onClick={() => handleVote(1)} className="cursor-pointer">
        {userVote?.data === 1 ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
      </div>
      <span className="text-lg font-bold text-teal-800">{totalVotes}</span>
      <div onClick={() => handleVote(-1)} className="cursor-pointer">
        {userVote?.data === -1 ? (
          <PiArrowFatDownFill />
        ) : (
          <PiArrowFatDownBold />
        )}
      </div>
    </div>
  );
}

export default FeedbackVotes;

"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
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
  const {
    data: userVote,
    error: userError,
    mutate: mutateVote,
  } = useSWR(`/api/feedback/get-user-vote?postId=${postId}`);

  if (userError) {
    toast.error("Ha ocurrido un error inesperado");
  }

  const isUpdatingVotes = useRef(false);
  const voteRef = useRef(0);

  const handleUpdateVote = async (vote = 1) => {
    const insertVotesResponse = await fetch("/api/feedback/insert-vote", {
      method: "post",
      body: JSON.stringify({
        postId,
        oldVote: userVote.data,
        newVote: userVote.data === vote ? 0 : vote,
      }),
    });

    if (insertVotesResponse.status !== 200) {
      toast.error("Ha ocurrido un error inesperado");
      return;
    }
    isUpdatingVotes.current = false;
  };

  const handleVote = async (vote: -1 | 1) => {
    if (isUpdatingVotes.current || !userVote) return;
    isUpdatingVotes.current = true;

    setTotalVotes((totalVotes) => {
      if (userVote.data === vote) {
        return totalVotes - userVote.data;
      } else {
        return totalVotes - userVote.data + vote;
      }
    });

    mutateVote(handleUpdateVote(vote), {
      optimisticData: { data: userVote.data === vote ? 0 : vote },
    });
    voteRef.current = userVote.data === vote ? 0 : vote;
  };

  return (
    <div className="flex flex-col items-center justify-center px-3 text-lg font-semibold text-teal-800 xs:px-4 xs:text-xl sm:px-6">
      <div onClick={() => handleVote(1)} className="cursor-pointer">
        {userVote?.data === 1 || (!userVote && voteRef.current === 1) ? (
          <PiArrowFatUpFill />
        ) : (
          <PiArrowFatUpBold />
        )}
        {/* {!userVote && <p>AAA</p>} */}
      </div>
      <span className="select-none text-lg font-bold text-teal-800">
        {totalVotes}
      </span>
      <div onClick={() => handleVote(-1)} className="cursor-pointer">
        {userVote?.data === -1 || (!userVote && voteRef.current === -1) ? (
          <PiArrowFatDownFill />
        ) : (
          <PiArrowFatDownBold />
        )}
      </div>
    </div>
  );
}

export default FeedbackVotes;

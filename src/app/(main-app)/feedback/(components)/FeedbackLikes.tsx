"use client";

import { useState } from "react";
import {
  PiArrowFatDownBold,
  PiArrowFatDownFill,
  PiArrowFatUpBold,
  PiArrowFatUpFill,
} from "react-icons/pi";

interface Props {
  likes: number;
}

function FeedbackLikes({ likes }: Props) {
  const [userLike, setUserLike] = useState<"" | "like" | "dislike">("");

  return (
    <div className="px-6 flex items-center justify-center flex-col font-semibold">
      <div>
        {userLike === "like" ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
      </div>
      <span>{likes}</span>
      <div>
        {userLike === "dislike" ? (
          <PiArrowFatDownFill />
        ) : (
          <PiArrowFatDownBold />
        )}
      </div>
    </div>
  );
}

export default FeedbackLikes;

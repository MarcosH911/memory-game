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
    <div className="px-6">
      <div>
        {userLike === "like" ? <PiArrowFatUpFill /> : <PiArrowFatUpBold />}
      </div>
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

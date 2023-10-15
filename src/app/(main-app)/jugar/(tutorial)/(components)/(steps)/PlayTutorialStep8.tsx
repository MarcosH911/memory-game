"use client";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";

function PlayTutorialStep8() {
  return (
    <PlayTutorialStepWrapper step={8}>
      <div className="flex h-full items-center justify-center gap-2 h-sm:gap-4">
        <div className="aspect[0.458] h-full rounded-xl">
          <iframe
            className="aspect-[0.458] h-full rounded-xl"
            src="https://www.youtube.com/embed/a81tZhLJ6sM?cc_load_policy=1"
          ></iframe>
        </div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep8;

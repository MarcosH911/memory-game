import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import PlayLevelTitle from "./(components)/PlayLevelTitle";
import PlayGame from "./(components)/PlayGame";
import Loading from "./loading";

export const dynamic = "force-dynamic";

const baseSequenceLength = 20;
const numTargets = 6;

async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const generatedSequence: number[] = [];

  const { data, error } = await supabase.from("user_level").select("level");

  let levelData = data?.[0]?.level;

  if (error) {
    console.error("There was an error getting the level of the user");
  }

  const level = levelData ? levelData : 1;

  const getTargetsCount = () => {
    let count = 0;
    for (let i = level; i < generatedSequence.length; i++) {
      if (generatedSequence[i] === generatedSequence[i - level]) {
        count++;
      }
    }
    return count;
  };

  for (let i = 0; i < baseSequenceLength + level; i++) {
    generatedSequence.push(Math.trunc(Math.random() * 8));
  }

  let targetsCount = getTargetsCount();
  while (targetsCount != numTargets) {
    const randomIndex = Math.trunc(
      Math.random() * (generatedSequence.length - level) + level,
    );
    const changeFirst = !Math.trunc(Math.random() * 2);
    if (
      targetsCount > numTargets &&
      generatedSequence[randomIndex] === generatedSequence[randomIndex - level]
    ) {
      if (changeFirst) {
        generatedSequence[randomIndex - level] = Math.trunc(Math.random() * 8);
      } else {
        generatedSequence[randomIndex] = Math.trunc(Math.random() * 8);
      }
    } else if (
      targetsCount < numTargets &&
      generatedSequence[randomIndex] !== generatedSequence[randomIndex - level]
    ) {
      if (changeFirst) {
        generatedSequence[randomIndex - level] = generatedSequence[randomIndex];
      } else {
        generatedSequence[randomIndex] = generatedSequence[randomIndex - level];
      }
    }
    targetsCount = getTargetsCount();
  }

  return (
    // <Loading />
    <div className="flex h-full flex-col items-center justify-center">
      <PlayLevelTitle level={level} />
      <PlayGame
        generatedSequence={generatedSequence}
        numTargets={numTargets}
        level={level}
      />
    </div>
  );
}

export default Page;

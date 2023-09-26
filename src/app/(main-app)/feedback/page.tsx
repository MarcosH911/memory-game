import FeedbackItem from "./(components)/FeedbackItem";
import FeedbackInputBox from "./(components)/FeedbackInputBox";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const feedbackPosts: {
  id: string;
  text: string;
  tags: string;
  likes: number;
}[] = [];

async function Page() {
  let offset = 0;

  const getFeedbackItems = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("feedback")
      .select("id, text, tags, likes")
      .order("likes", { ascending: false })
      .range(offset, offset + 9);

    if (error || !data) {
      console.error("There was an error getting the feedback");
      return;
    }

    // TODO: Fix error
    feedbackPosts.push(...data);
    offset += 10;
  };

  await getFeedbackItems();

  // console.log(feedbackPosts);

  return (
    <div>
      <h1 className="text-6xl font-bold text-emerald-950 mt-8 text-center">
        Feedback
      </h1>
      <h2 className="text-xl text-center text-teal-800 mt-6 mb-10">
        Ayúdanos a mejorar
      </h2>
      <div className="mx-auto flex max-w-3xl flex-col justify-start gap-6">
        <FeedbackInputBox />

        {feedbackPosts.map((item) => (
          <FeedbackItem key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Page;

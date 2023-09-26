import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the userId to insert the votes");
    return NextResponse.error();
  }

  const votesDifference = response.newVote - response.oldVote;

  const { data: postVotes, error } = await supabase
    .from("feedback_posts")
    .select("votes")
    .eq("id", response.postId)
    .single();

  if (error) {
    console.error("There was an error getting the feedback likes");
    return NextResponse.error();
  }

  const postVotesPromise = await supabase
    .from("feedback_posts")
    .update({ votes: postVotes.votes + votesDifference })
    .eq("id", response.postId);

  let userVotePromise;

  if (response.oldVote === 0) {
    userVotePromise = supabase.from("feedback_votes").insert({
      user_id: userId,
      post_id: response.postId,
      vote_type: response.newVote,
    });
  } else if (response.newVote === 0) {
    userVotePromise = supabase
      .from("feedback_votes")
      .delete()
      .match({ post_id: response.postId, user_id: userId });
  } else {
    userVotePromise = supabase
      .from("feedback_votes")
      .update({
        vote_type: response.newVote,
      })
      .match({ post_id: response.postId, user_id: userId });
  }

  const [{ error: postVotesError }, { error: userVoteError }] =
    await Promise.all([postVotesPromise, userVotePromise]);

  if (postVotesError || userVoteError) {
    console.error("There was an error inserting the feedback votes");
    return NextResponse.error();
  }

  return NextResponse.json({ status: 200 });
}

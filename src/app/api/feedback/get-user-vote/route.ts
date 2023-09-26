import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the user");
    return NextResponse.error();
  }

  const { data, error } = await supabase
    .from("feedback_votes")
    .select("vote_type")
    .match({ post_id: postId, user_id: userId });

  if (error) {
    console.error("There was an error getting the user vote");
    return NextResponse.error();
  }

  if (data.length === 0) {
    return NextResponse.json({ data: 0 }, { status: 200 });
  } else {
    return NextResponse.json({ data: data[0].vote_type }, { status: 200 });
  }
}

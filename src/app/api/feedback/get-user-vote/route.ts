import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import CustomError from "@/helpers/CustomError";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      throw new CustomError("", 400);
    }

    const { data, error } = await supabase
      .from("feedback_votes")
      .select("vote_type")
      .match({ post_id: postId, user_id: userId });

    if (error) {
      throw new CustomError("", 400);
    }

    if (data.length === 0) {
      return NextResponse.json({ data: 0 }, { status: 200 });
    } else {
      return NextResponse.json({ data: data[0].vote_type }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

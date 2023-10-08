import CustomError from "@/helpers/CustomError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const offset = Number(searchParams.get("offset"));
    const supabase = createRouteHandlerClient({ cookies });

    const { data, error } = await supabase
      .from("feedback_posts")
      .select("id, text, tags, votes")
      .order("votes", { ascending: false })
      .range(offset, offset + 9);

    if (error) {
      throw new CustomError("", 400);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

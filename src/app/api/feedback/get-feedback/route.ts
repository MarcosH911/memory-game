import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset"));
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("feedback")
    .select("text, tags, likes")
    .order("likes", { ascending: false })
    .range(offset, offset + 9);

  if (error) {
    console.error("There was an error getting the feedback");
    return NextResponse.error();
  }

  return NextResponse.json({ data }, { status: 200 });
}

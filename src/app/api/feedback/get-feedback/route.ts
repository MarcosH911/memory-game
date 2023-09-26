import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { data, error } = await supabase
    .from("feedback")
    .select("text, tags, likes")
    .order("likes", { ascending: false })
    .range(response.offset, response.offset + 9);

  if (error) {
    console.error("There was an error getting the feedback");
    return NextResponse.error();
  }

  return NextResponse.json({ data }, { status: 200 });
}

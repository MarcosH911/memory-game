import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  console.log("AAA");

  const { error } = await supabase
    .from("feedback")
    .insert({ text: response.text, tags: response.tags });

  if (error) {
    console.error("There was an error inserting the feedback");
    return NextResponse.error();
  }

  return NextResponse.json({ status: 200 });
}

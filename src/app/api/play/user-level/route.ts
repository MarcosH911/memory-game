import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.from("user_level").select("level");

  let userLevel = data?.[0]?.level;

  if (error) {
    console.error("There was an error getting the level of the user");
    return NextResponse.error();
  }

  if (!userLevel) {
    userLevel = 1;
  }

  return NextResponse.json({ userLevel }, { status: 200 });
}

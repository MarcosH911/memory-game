import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase.from("user_level").select("level");

  if (error) {
    return NextResponse.error();
  }

  let levelData = data?.[0]?.level;
  const level = levelData ? levelData : 1;

  return NextResponse.json({ data: level }, { status: 200 });
}

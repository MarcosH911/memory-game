import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    return NextResponse.error();
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) {
    return NextResponse.error();
  }

  return NextResponse.json({ data }, { status: 200 });
}

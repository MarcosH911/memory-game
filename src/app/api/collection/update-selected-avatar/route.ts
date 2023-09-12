import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    return NextResponse.error();
  }

  const { error } = await supabase
    .from("profiles")
    .update({ avatar_path: response.avatarPath })
    .eq("user_id", userId);

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ status: 200 });
}

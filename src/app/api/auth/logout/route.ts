import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ status: 200 });
}

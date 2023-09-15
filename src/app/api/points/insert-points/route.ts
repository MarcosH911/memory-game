import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the userId to insert the points");
    return NextResponse.error();
  }

  const { error } = await supabase.from("points_transactions").insert({
    user_id: userId,
    coins: response.coins,
    diamonds: response.diamonds,
  });

  if (error) {
    console.error("There was an error inserting the points");
    return NextResponse.error();
  }

  return NextResponse.json({ status: 200 });
}

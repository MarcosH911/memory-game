import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the user");
    return NextResponse.error();
  }

  const { data: userPointsData, error: userPointsError } = await supabase
    .from("user_points")
    .select("*");

  if (userPointsError) {
    console.error("There was an error selecting the user points");
    return NextResponse.error();
  }

  let points = {
    coins: userPointsData?.[0].total_coins || 0,
    diamonds: userPointsData?.[0].total_diamonds || 0,
  };

  return NextResponse.json({ data: points }, { status: 200 });
}

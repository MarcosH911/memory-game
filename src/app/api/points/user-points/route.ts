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
    .select("*")
    .single();

  if (
    userPointsError ||
    !userPointsData.total_coins ||
    !userPointsData.total_diamonds
  ) {
    console.error("There was an error selecting the user points");
    return NextResponse.error();
  }

  return NextResponse.json({ data: userPointsData }, { status: 200 });
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const userId = (await supabase.auth.getSession()).data.session?.user.id;

  if (!userId) {
    console.error("There was an error getting the userId to insert the points");
    return NextResponse.error();
  }

  const { data, error } = await supabase
    .from("user_level")
    .select("created_at");

  if (error) {
    console.error(
      "There was an error getting the current user level to update it",
    );
    return NextResponse.error();
  }

  const currentDate = new Date().toISOString().slice(0, 10);

  if (data.length === 0 || currentDate !== data[0].created_at) {
    const { error } = await supabase
      .from("levels")
      .insert({ user_id: userId, level: response.level });

    if (error) {
      console.error("There was an error inserting the user level");
      return NextResponse.error();
    }
  } else {
    await supabase
      .from("levels")
      .update({ level: response.level })
      .eq("user_id", userId)
      .eq("created_at", currentDate);
  }

  return NextResponse.json({ status: 200 });
}

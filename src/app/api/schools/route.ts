import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { data, error } = await supabase
    .from("schools")
    .select("school_name, school_value");

  if (error) {
    console.error("There was an error getting the schools");
    return NextResponse.error();
  }

  return NextResponse.json({ data }, { status: 200 });
}

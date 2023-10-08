import CustomError from "@/helpers/CustomError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data, error } = await supabase
      .from("schools")
      .select("school_name, school_value");

    if (error) {
      throw new CustomError("", 400);
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

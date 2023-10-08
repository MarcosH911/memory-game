import CustomError from "@/helpers/CustomError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const response = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { error } = await supabase
      .from("feedback_posts")
      .insert({ text: response.text, tags: response.tags });

    if (error) {
      throw new CustomError("", 400);
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

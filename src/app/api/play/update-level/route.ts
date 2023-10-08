import CustomError from "@/helpers/CustomError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const response = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const userId = (await supabase.auth.getSession()).data.session?.user.id;

    if (!userId) {
      throw new CustomError("", 400);
    }

    const { data, error } = await supabase
      .from("user_level")
      .select("created_at");

    if (error) {
      throw new CustomError("", 400);
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    if (data.length === 0 || currentDate !== data[0].created_at) {
      const { error } = await supabase
        .from("levels")
        .insert({ user_id: userId, level: response.level });

      if (error) {
        throw new CustomError("", 400);
      }
    } else {
      await supabase
        .from("levels")
        .update({ level: response.level })
        .eq("user_id", userId)
        .eq("created_at", currentDate);
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}

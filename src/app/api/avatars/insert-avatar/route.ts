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

    if (!userId || !response.avatarPath) {
      throw new CustomError("", 400);
    }

    const { error } = await supabase
      .from("avatars_transactions")
      .insert({ user_id: userId, avatar_path: response.avatarPath });

    if (error) {
      throw new CustomError("", 400);
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}

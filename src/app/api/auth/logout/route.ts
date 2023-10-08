import CustomError from "@/helpers/CustomError";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new CustomError(error.message, 400);
    }

    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: error.status });
  }
}

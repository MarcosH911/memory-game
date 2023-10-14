import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const { data, error } = await supabase.from("user_points").select("*");

    if (error) {
      throw new Error();
    }

    let points = {
      coins: data?.[0].total_coins || 0,
      diamonds: data?.[0].total_diamonds || 0,
    };

    return NextResponse.json({ data: points }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Ha ocurrido un error inesperado" },
      { status: 400 },
    );
  }
}

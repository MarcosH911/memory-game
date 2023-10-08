import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import getFakeEmail from "@/helpers/getFakeEmail";
import { revalidatePath } from "next/cache";
import CustomError from "@/helpers/CustomError";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const response = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    if (!response.username || !response.password) {
      throw new CustomError("Introduce el usuario y la contraseña", 400);
    }

    const fakeEmail = getFakeEmail(response.username);

    const { error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password: response.password,
    });

    if (error) {
      throw new CustomError("Usuario o contraseña incorrectos", 400);
    }

    revalidatePath("/");
    return NextResponse.json({ status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}

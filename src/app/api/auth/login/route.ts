import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import getFakeEmail from "@/helpers/getFakeEmail";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (!response.username || !response.password) {
    return NextResponse.json(
      {
        message: "Introduce el usuario y la contraseña",
      },
      {
        status: 400,
      },
    );
  }

  const fakeEmail = getFakeEmail(response.username);

  const { error } = await supabase.auth.signInWithPassword({
    email: fakeEmail,
    password: response.password,
  });

  if (error) {
    return NextResponse.json(
      {
        message: "Usuario o contraseña incorrectos",
      },
      {
        status: 400,
      },
    );
  }

  revalidatePath("/");
  return NextResponse.json({ status: 200 });
}

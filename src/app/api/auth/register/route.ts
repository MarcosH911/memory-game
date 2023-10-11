import "server-only";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import getFakeEmail from "@/helpers/getFakeEmail";
import supabaseServiceClient from "@/utils/supabaseServiceClient";
import CustomError from "@/helpers/CustomError";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const response = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });

    const currentUserRole = (await supabase.auth.getSession()).data.session
      ?.user.user_metadata.role;

    if (currentUserRole !== "admin") {
      throw new CustomError("Esta cuenta no tiene el rol 'admin'", 403);
    }

    if (
      !response.username ||
      !response.password ||
      !response.fullName ||
      !response.role ||
      (response.role === "student" &&
        (!response.school ||
          !response.stage ||
          !response.grade ||
          !response.schoolClass)) ||
      (response.role === "teacher" && !response.school)
    ) {
      throw new CustomError("Introduce todas las credenciales", 400);
    }

    if (response.password.length < 6) {
      throw new CustomError("Introduzca una contraseña más larga", 400);
    }

    const fakeEmail = getFakeEmail(response.username);

    const { data: newUserData, error: newUserError } =
      await supabaseServiceClient.auth.admin.createUser({
        email: fakeEmail,
        password: response.password,
        user_metadata: {
          data: { role: response.role },
        },
        email_confirm: true,
      });

    if (newUserError || !newUserData.user) {
      throw new CustomError("Error al crear el usuario", 400);
    }

    const { error: newProfileError } = await supabase.from("profiles").insert({
      user_id: newUserData.user.id,
      username: response.username,
      full_name: response.fullName,
      role: response.role,
      school: response.school || null,
      stage: response.stage || null,
      grade: response.grade || null,
      class: response.schoolClass || null,
    });

    if (newProfileError) {
      throw new CustomError("Error al crear el perfil", 400);
    }

    const { error: avatarsError } = await supabase
      .from("avatars_transactions")
      .insert({
        user_id: newUserData.user.id,
        avatar_path: "Default-Avatar.png",
      });

    if (avatarsError) {
      throw new CustomError("Error al insertar el avatar", 400);
    }

    return NextResponse.json(
      { message: "Usuario registrado correctamente" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}

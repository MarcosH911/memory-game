import "server-only";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import getFakeEmail from "@/helpers/getFakeEmail";
import supabaseServiceClient from "@/utils/supabaseServiceClient";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const response = await request.json();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const currentUserRole = (await supabase.auth.getSession()).data.session?.user
    .user_metadata.role;

  if (currentUserRole !== "admin") {
    return NextResponse.json(
      {
        message: 'Esta cuenta no tiene el rol "admin"',
      },
      {
        status: 403,
      },
    );
  }

  if (
    !response.username ||
    !response.password ||
    !response.fullName ||
    !response.school ||
    !response.newUserRole
  ) {
    return NextResponse.json(
      {
        message: "Introduce todas las credenciales",
      },
      {
        status: 400,
      },
    );
  }

  if (response.password.length < 6) {
    return NextResponse.json(
      {
        message: "Introduzca una contraseña más larga",
      },
      {
        status: 400,
      },
    );
  }

  const fakeEmail = getFakeEmail(response.username);

  const { data: newUserData, error: newUserError } =
    await supabaseServiceClient.auth.admin.createUser({
      email: fakeEmail,
      password: response.password,
      user_metadata: {
        data: { role: response.newUserRole },
      },
    });

  if (newUserError || !newUserData.user) {
    return NextResponse.json(
      {
        message: "Error al crear el usuario",
      },
      {
        status: 500,
      },
    );
  }

  const { error: newProfileError } = await supabase.from("profiles").insert({
    user_id: newUserData.user.id,
    username: response.username,
    full_name: response.fullName,
    role: response.newUserRole,
    school: response.school,
  });

  if (newProfileError) {
    return NextResponse.json(
      {
        message: "Error al crear el perfil",
      },
      {
        status: 500,
      },
    );
  }

  const { error: avatarsError } = await supabase
    .from("avatars_transactions")
    .insert({
      user_id: newUserData.user.id,
      avatar_path: "Default-Avatar.png",
    });

  if (avatarsError) {
    return NextResponse.json(
      {
        message: "Error al insertar el avatar",
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    {
      message: "Usuario registrado correctamente",
    },
    { status: 200 },
  );
}

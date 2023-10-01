import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/|api/|_vercel/).*)"],
};

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next();

  if (request.nextUrl.searchParams.get("prefetch") === "true") {
    return response;
  }

  const supabase = createMiddlewareClient<Database>({
    req: request,
    res: response,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session && request.nextUrl.pathname !== "/iniciar-sesion") {
    return NextResponse.redirect(new URL("/iniciar-sesion", request.url));
  } else if (session && request.nextUrl.pathname === "/iniciar-sesion") {
    return NextResponse.redirect(new URL("/jugar", request.url));
  } else if (
    session?.user.user_metadata.role !== "admin" &&
    request.nextUrl.pathname === "/registrar"
  ) {
    return NextResponse.redirect(new URL("/jugar", request.url));
  }
  return response;
};

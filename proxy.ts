import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Public-first mode: learning content is open to everyone.
  // Keep admin/auth infrastructure intact so it can be re-enabled later.
  if (path === "/login" || path === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (path.startsWith("/admin") || path.startsWith("/teacher") || path.startsWith("/student/messages")) {
    const { createServerClient } = await import("@supabase/ssr");
    const response = NextResponse.next({ request });
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      { cookies: { getAll: () => request.cookies.getAll(), setAll() {} } }
    );
    const { data: claims } = await supabase.auth.getClaims();
    if (!claims) return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
};

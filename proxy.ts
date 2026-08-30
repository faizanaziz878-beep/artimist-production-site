import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.artimistproductions.com";

export function proxy(request: NextRequest) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const hostname = request.nextUrl.hostname.toLowerCase();

  if (forwardedProto === "http" || hostname === "artimistproductions.com") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.hostname = CANONICAL_HOST;
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_vercel|api/health).*)"],
};

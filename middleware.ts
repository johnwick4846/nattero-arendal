import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin
  if (pathname.startsWith("/admin")) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return NextResponse.next(); // no password set = open (dev)

    const auth = req.headers.get("authorization");
    if (!auth) {
      return new NextResponse("Autentisering kreves", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Nattero Admin"' },
      });
    }

    const [, encoded] = auth.split(" ");
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [, password] = decoded.split(":");

    if (password !== adminPassword) {
      return new NextResponse("Feil passord", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Nattero Admin"' },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

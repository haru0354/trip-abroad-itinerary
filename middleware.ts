import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

// admin用のミドルウェア
const adminMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "admin",
  },
});

// itineraryUser用のミドルウェア
const itineraryUserMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token?.role === "itineraryUser",
  },
});

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    return adminMiddleware(req as NextRequestWithAuth, event);
  }

  if (req.nextUrl.pathname.startsWith("/travel_brochure/")) {
    return itineraryUserMiddleware(req as NextRequestWithAuth, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/travel_brochure/home/:path*",
    "/travel_brochure/:path*",
  ],
};

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
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/memorybook/share")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    return adminMiddleware(req as NextRequestWithAuth, event);
  }

  if (pathname.startsWith("/memorybook/")) {
    return itineraryUserMiddleware(req as NextRequestWithAuth, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/memorybook/home/:path*",
    "/memorybook/:path*",
  ],
};

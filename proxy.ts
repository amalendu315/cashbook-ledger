import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Assign the wrapped middleware to a constant first to satisfy Turbopack's strict export checks
const middleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect Master and User Management routes for Admins only
    if (
      (path.startsWith("/masters") || path.startsWith("/user-management")) &&
      token?.role !== "ADMIN"
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      // Require the user to be logged in to access protected routes
      authorized: ({ token }) => !!token,
    },
  },
);

// Explicitly export it as default
export default middleware;

// Apply middleware only to the internal application paths
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/masters/:path*",
    "/reports/:path*",
    "/receipts/:path*",
    "/payments/:path*",
    "/fund-transfer/:path*",
    "/user-management/:path*",
  ],
};

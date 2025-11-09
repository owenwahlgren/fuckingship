import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth(req => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

  // Redirect to home if not logged in
  if (!isLoggedIn && (isOnDashboard || isOnAdmin)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Check admin access
  if (isOnAdmin && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}

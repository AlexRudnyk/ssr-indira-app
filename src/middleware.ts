import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Middleware function
export function middleware(request: NextRequest) {
  //   const excludedPaths = ["/login", "/signup", "/api/*"] // Paths to exclude
  //   const excludedPaths = ["/", "/products/:id", "/login"]

  //   // If the requested URL matches an excluded path, do nothing (no redirect)
  //   if (excludedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
  //     return NextResponse.next()
  //   }

  console.log("Hi from middleware!")

  return NextResponse.next()

  // Redirect all other paths
  //   return NextResponse.redirect(new URL("/home", request.url))
}

// Config with a general matcher for all paths
export const config = {
  matcher: "/:path*"
}

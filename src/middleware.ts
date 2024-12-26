import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessTokenCookie = request.cookies.has('accessToken');
  const introShownCookie = request.cookies.has('introShown');
  const pathname = request.nextUrl.pathname

  if (accessTokenCookie) {
    // If the user is logged in, redirect to the home page if they try to access the login or register page
    if (['/login', '/register'].includes(pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    // If the user is not logged in, redirect to the intro page if they haven't seen it yet
    if (!introShownCookie && pathname !== '/intro') {
      return NextResponse.redirect(new URL('/intro', request.url));
    }
    // If the user is not logged in and has seen the intro, redirect to the login page if they try to access any other page
    // except the login and register pages
    if (introShownCookie && !['/login', '/register'].includes(pathname)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}

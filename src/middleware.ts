import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const accessTokenCookie = request.cookies.has('accessToken');
  const introShownCookie = request.cookies.has('introShown');
  const pathname = request.nextUrl.pathname

  if (accessTokenCookie) {
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    if (!introShownCookie && pathname !== '/intro') {
      return NextResponse.redirect(new URL('/intro', request.url));
    }
    if (introShownCookie && pathname !== '/login') {
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

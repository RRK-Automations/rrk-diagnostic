import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session_token')?.value;
  const { pathname } = request.nextUrl;

  // Protect admin sub-pages (e.g. /admin/dashboard, /admin/appointments, etc.)
  // Note: /admin is the login page itself, so we check if the path starts with /admin/
  if (pathname.startsWith('/admin/') && pathname !== '/admin') {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin';
      return NextResponse.redirect(url);
    }
  }

  // If the user is logged in, redirect away from the login page (/admin) to the dashboard
  if (pathname === '/admin') {
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/dashboard';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};

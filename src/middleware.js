import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_env';

// Ensure we use the same JWT_SECRET as the login route
if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET not set in environment - using default (insecure)');
}

/**
 * Protect admin pages and admin API routes.
 * - Redirect to /admin/login for page access when no/invalid cookie
 * - For API routes under /api/admin, return 401 JSON when unauthenticated
 */
export function middleware(req) {
  const { pathname } = req.nextUrl;

  // only protect /admin and /api/admin
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // Allow public pages for signup/login (don't redirect these)
  // Allow public pages for signup/login (don't redirect these)
  // Also allow the corresponding API endpoints so new admins can be created
  // without an existing authenticated admin cookie.
  if (
    pathname === '/admin/login' ||
    pathname === '/admin/signup' ||
    pathname === '/api/admin/login' ||
    pathname === '/api/admin/signup'
  ) {
    return NextResponse.next();
  }

  const cookieHeader = req.headers.get('cookie') || '';
  const tokenPair = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('token='));
  const token = tokenPair ? tokenPair.split('=')[1] : null;

  if (!token) {
    // If request is for API under /api/admin, return JSON 401
    if (pathname.startsWith('/api/admin')) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Authentication required' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded?.adminId) throw new Error('Invalid token payload');
    // allow
    return NextResponse.next();
  } catch (err) {
    if (pathname.startsWith('/api/admin')) {
      return new NextResponse(JSON.stringify({ success: false, message: 'Invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
    const loginUrl = new URL('/admin/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

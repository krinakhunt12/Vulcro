import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_in_env';

// Ensure we use the same JWT_SECRET as the login route
if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET not set in environment - using default (insecure)');
}

/**
 * Edge-compatible JWT verification without Node.js crypto module
 */
function verifyJWT(token, secret) {
    try {
        // Split the token into parts
        const parts = token.split('.');
        if (parts.length !== 3) throw new Error('Invalid token format');

        // Decode payload (base64url decode)
        const base64Url = parts[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const payload = JSON.parse(jsonPayload);

        // Check if token has expired
        if (payload.exp && payload.exp * 1000 < Date.now()) {
            throw new Error('Token expired');
        }

        return payload;
    } catch (err) {
        throw new Error(`JWT verification failed: ${err.message}`);
    }
}

/**
 * Protect admin pages and admin API routes.
 * - Redirect to /admin/login for page access when no/invalid cookie
 * - For API routes under /api/admin, return 401 JSON when unauthenticated
 */
export function middleware(req) {
    const { pathname } = req.nextUrl;

    console.log('[Middleware] Request:', pathname);

    // only protect /admin and /api/admin
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
        console.log('[Middleware] Not an admin route, allowing');
        return NextResponse.next();
    }

    // Allow public pages for signup/login (don't redirect these)
    // Also allow the corresponding API endpoints so new admins can be created
    // without an existing authenticated admin cookie.
    if (
        pathname === '/admin/login' ||
        pathname === '/admin/signup' ||
        pathname === '/api/admin/login' ||
        pathname === '/api/admin/signup'
    ) {
        console.log('[Middleware] Public route, allowing:', pathname);
        return NextResponse.next();
    }

    const cookieHeader = req.headers.get('cookie') || '';
    const tokenPair = cookieHeader.split(';').map((c) => c.trim()).find((c) => c.startsWith('token='));
    const token = tokenPair ? tokenPair.split('=')[1] : null;

    console.log('[Middleware] Token found:', token ? 'YES' : 'NO');

    if (!token) {
        console.log('[Middleware] No token, redirecting to /admin/login');
        // If request is for API under /api/admin, return JSON 401
        if (pathname.startsWith('/api/admin')) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Authentication required' }), { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const loginUrl = new URL('/admin/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const decoded = verifyJWT(token, JWT_SECRET);
        if (!decoded ? .adminId) throw new Error('Invalid token payload');
        console.log('[Middleware] Valid token, allowing access to:', pathname);
        return NextResponse.next();
    } catch (err) {
        console.log('[Middleware] Invalid token, redirecting to /admin/login');
        console.error('[Middleware] Token error:', err.message);
        if (pathname.startsWith('/api/admin')) {
            return new NextResponse(
                JSON.stringify({ success: false, message: 'Invalid token' }), { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
        }
        const loginUrl = new URL('/admin/login', req.url);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};
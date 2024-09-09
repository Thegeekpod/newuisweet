import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Ensure this matches your server-side secret

export async function middleware(request) {
  const { pathname } = new URL(request.url);

  // Get cookies from the request header
  const cookies = request.headers.get('cookie') || '';
  const parsedCookies = parse(cookies);
  const token = parsedCookies.session || '';

  // Log the token for debugging
  console.log('Token:', token);

  // Check if the request path starts with '/admin'
  if (pathname.startsWith('/admin')) {
    try {
      // Verify the token using `jose`
      const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
      console.log('Token payload:', payload);

      // If the user is trying to access '/admin/login' or '/admin', redirect to '/admin/dashboard'
      if (pathname === '/admin/login' || pathname === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
    } catch (error) {
      // Token is invalid or expired
      console.error('Token verification error:', error);
      if (pathname !== '/admin/login') {
        const response = NextResponse.redirect(new URL('/admin/login', request.url));
        response.cookies.delete('session'); // Clear the invalid cookie
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Apply basic auth only to dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const authHeader = request.headers.get('authorization');
    
    // Demo credentials - change these for production!
    const validUser = 'admin';
    const validPass = 'admin123'; // Change this to a secure password
    
    // If no authorization header, prompt for login
    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 
          'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"' 
        },
      });
    }
    
    // Extract and verify credentials
    const authValue = authHeader.split(' ')[1];
    const [user, password] = Buffer.from(authValue, 'base64').toString().split(':');
    
    if (user !== validUser || password !== validPass) {
      return new NextResponse('Invalid credentials', {
        status: 401,
        headers: { 
          'WWW-Authenticate': 'Basic realm="Secure Area", charset="UTF-8"' 
        },
      });
    }
  }
  
  // Allow the request to continue if authenticated or not a dashboard route
  return NextResponse.next();
}

// Configure which routes this middleware applies to
export const config = {
  matcher: '/dashboard/:path*', // Protect all dashboard routes
};
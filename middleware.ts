// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // 🔐 Protect dashboard pages
  if (pathname.startsWith('/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/', req.url));

    const role = token.role;
    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/dashboard/staff') && role !== 'staff' && role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    if (pathname.startsWith('/dashboard/student') && role !== 'student') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // 🔐 Protect API endpoints
  if (pathname.startsWith('/api/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (pathname.startsWith('/api/admission-officer')) {
    if (!token || (token.role !== 'admin' && token.role !== 'staff')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// ✅ Match both dashboard and API routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/admin/:path*',
    '/api/admission-officer/:path*',
  ],
};

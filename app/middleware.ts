import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const xfh = request.headers.get('x-forwarded-host')

  if (
    process.env.NODE_ENV === 'development' &&
    origin &&
    xfh &&
    !origin.includes(xfh)
  ) {
    console.warn(`[Middleware] ⚠️ Origin mismatch: origin=${origin}, x-forwarded-host=${xfh}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(.*)',
}

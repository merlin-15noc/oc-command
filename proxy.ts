import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const TOKEN = process.env.OC_GATEWAY_TOKEN ?? ''
const COOKIE_NAME = 'oc_auth'
const LOGIN_PATH = '/login'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow login page and its assets
  if (pathname === LOGIN_PATH || pathname.startsWith('/_next') || pathname === '/favicon.ico') {
    return NextResponse.next()
  }

  // Check auth cookie
  const authCookie = request.cookies.get(COOKIE_NAME)
  if (authCookie?.value === TOKEN) {
    return NextResponse.next()
  }

  // Redirect to login, preserving intended destination
  const loginUrl = new URL(LOGIN_PATH, request.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

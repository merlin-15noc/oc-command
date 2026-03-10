import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const TOKEN = process.env.OC_GATEWAY_TOKEN ?? ''
const COOKIE_NAME = 'oc_auth'

export async function POST(request: NextRequest) {
  const { token } = await request.json()

  if (!TOKEN || token !== TOKEN) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return NextResponse.json({ ok: true })
}

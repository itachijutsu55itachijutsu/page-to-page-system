import { NextResponse } from 'next/server';
import { COOKIE_NAME, createToken } from '@/lib/gate';

export async function POST() {
  const secret = process.env.GATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Server misconfigured: missing GATE_SECRET.' }, { status: 500 });
  }

  const { token, maxAgeSeconds } = await createToken(secret);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true, // not readable/editable via client-side JS
    secure: true, // HTTPS only
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  });
  return response;
}

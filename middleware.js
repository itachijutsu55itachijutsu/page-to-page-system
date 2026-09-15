import { NextResponse } from 'next/server';
import { COOKIE_NAME, verifyToken } from '@/lib/gate';

export const config = {
  matcher: ['/page2'],
};

const MAINTENANCE_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>404 - Not Found</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         background:#0b0b0d; color:#8a8f98; font-family:system-ui,-apple-system,sans-serif; text-align:center; }
  h1 { color:#e5e7eb; font-size:20px; margin:0 0 8px; }
  p { font-size:14px; margin:0; }
</style>
</head>
<body>
  <div>
    <h1>Server is temporarily under maintenance</h1>
    <p>Please check back later.</p>
  </div>
</body>
</html>`;

function maintenanceResponse() {
  return new NextResponse(MAINTENANCE_HTML, {
    status: 404,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function middleware(req) {
  const secret = process.env.GATE_SECRET;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  const isValid = await verifyToken(secret, token);
  if (!isValid) {
    return maintenanceResponse();
  }

  // Valid pass used once: let this request through, then immediately
  // invalidate the cookie so the same token can't be reused (e.g. if the
  // person hits back/forward, refreshes, or shares the link with someone).
  const response = NextResponse.next();
  response.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
  return response;
}

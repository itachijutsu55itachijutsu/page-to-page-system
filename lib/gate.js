// A cryptographically signed, short-lived, single-use pass that proves a
// request to /page2 originated from clicking the button on Page 1.
//
// Token shape: "<expiryTimestamp>.<hmacSignatureOfExpiry>"
// - Nobody can forge a valid signature without the server's GATE_SECRET.
// - The token expires quickly, so it can't be bookmarked or shared.
// - The middleware also clears the cookie after one successful visit,
//   so even within the time window the pass only works once.

export const COOKIE_NAME = 'gatepass';
const TOKEN_TTL_SECONDS = 20; // how long the pass is valid after Page 1 issues it

function toBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function hmacSign(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return toBase64Url(signature);
}

export async function createToken(secret) {
  const expires = Date.now() + TOKEN_TTL_SECONDS * 1000;
  const signature = await hmacSign(secret, String(expires));
  return { token: `${expires}.${signature}`, maxAgeSeconds: TOKEN_TTL_SECONDS };
}

export async function verifyToken(secret, token) {
  if (!secret || !token) return false;
  const [expiresStr, signature] = token.split('.');
  if (!expiresStr || !signature) return false;

  const expires = Number(expiresStr);
  if (!expires || Date.now() > expires) return false; // expired

  const expectedSignature = await hmacSign(secret, expiresStr);
  return expectedSignature === signature; // forged/tampered tokens fail here
}

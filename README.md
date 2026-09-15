# Gated Pages (Page 1 → Page 2)

Do bilkul halki (plain, koi extra library nahi) pages. Page 1 pe ek "Continue"
button hai. Sirf usko click karne se hi Page 2 tak pahunch sakte hain — direct
URL type karna, link share karna, ya purana bookmark use karna sab **404
"Server is temporarily under maintenance"** dikhayega.

## Ye kaam kaise karta hai

Simple Referer-header check aasani se spoof ho sakta hai (koi bhi tool jaisa
curl/Postman fake header bhej sakta hai). Isliye yahan asli security use ki
hai:

1. Page 1 ka button dabne par browser `/api/gate` ko ek request bhejta hai.
2. Server ek **cryptographically signed token** banata hai (HMAC-SHA256,
   aapke secret key se) jisme ek expiry time bhi hota hai, aur usko ek
   **httpOnly cookie** me daal deta hai (JavaScript se ye cookie padha ya
   badla nahi ja sakta).
3. Browser `/page2` pe redirect hota hai.
4. **Middleware** har `/page2` request pe cookie check karta hai:
   - Token missing hai → **404**
   - Token ka signature match nahi karta (forge/tamper kiya gaya) → **404**
   - Token **20 second** se purana ho chuka hai → **404**
   - Sab sahi hai → content dikha deta hai, **aur turant cookie clear kar
     deta hai** taake wahi token dobara use na ho sake (single-use)

Matlab: koi bhi `/page2` ka link kahin bhi paste kare, wo sirf 404 dekhega —
chahe wo link kisi ne Page 1 se hi generate kyun na kiya ho, kyunke token
sirf 20 second ke liye aur sirf ek baar valid hota hai.

## Local testing

```bash
npm install
cp .env.example .env.local
# .env.local me GATE_SECRET set karein, e.g.:
# openssl rand -hex 32
npm run dev
```

## Free deployment — Vercel + GitHub

1. GitHub pe naya repo banakar push karein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. [vercel.com](https://vercel.com) pe GitHub se sign in karke **Add New →
   Project** se apna repo import karein.
3. Deploy se pehle **Environment Variables** me ye add karein:
   | Key | Value |
   |---|---|
   | `GATE_SECRET` | ek lambi random string (terminal me `openssl rand -hex 32` chala ke bana sakte hain) |
4. **Deploy** dabayein.

Bas — koi database, koi extra service nahi chahiye. Poora project sirf
Vercel ke free (Hobby) plan pe chal jata hai.

## Customize karne layak cheezein

- `lib/gate.js` me `TOKEN_TTL_SECONDS` — abhi 20 second hai, chahen to
  badal sakte hain (zyada lamba rakhna security thodi kam kar deta hai).
- `app/page.js` — Page 1 ka button aur UI (aapne bataya UI baad me batayenge).
- `app/page2/page.js` — Page 2 ka asli content.
- `middleware.js` me `MAINTENANCE_HTML` — 404 page ka design.

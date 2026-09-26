'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const TARGET_URL = 'https://www.profitableratecpmnetwork.com/pr05z0d17?key=8c2d662b33c1776277adf8cc2c0433f0'; // <-- apna URL yahan replace karein
const GA_MEASUREMENT_ID = 'G-KPFJDCXDLR'; // <-- apna GA4 Measurement ID yahan daalein

export default function Page2() {
  useEffect(() => {
    // Thoda delay taake GA event fire hone ka time mil jaye redirect se pehle
    const timer = setTimeout(() => {
      window.location.replace(TARGET_URL);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#000',
      }}
    >
      {/* Google Analytics (GA4) */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      <img
        src="/page2.jpg"
        alt=""
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </main>
  );
}

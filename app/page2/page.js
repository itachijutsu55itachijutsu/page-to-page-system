'use client';

import { useEffect } from 'react';

const TARGET_URL = 'https://example.com'; // <-- apna URL yahan replace karein

export default function Page2() {
  useEffect(() => {
    window.location.replace(TARGET_URL);
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

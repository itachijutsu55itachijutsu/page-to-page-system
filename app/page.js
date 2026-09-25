'use client';

import { useEffect, useState } from 'react';

const LOADING_MS = 3000;

export default function Home() {
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), LOADING_MS);
    return () => clearTimeout(timer);
  }, []);

  async function handleContinue() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/gate', { method: 'POST' });
      if (!res.ok) throw new Error('failed');
      window.location.href = '/page2';
    } catch {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <>
      <div className="page">
        <div className="card">
          <div className="brand">Full Video</div>
          <p className="tagline">flurze.online</p>
          <div className="divider" />

          <p className="message">
            Your content is ready.
            <br />
            Tap continue when you're set.
          </p>

          {!ready ? (
            <div className="progress-wrap" aria-hidden="true">
              <div className="progress-bar" />
            </div>
          ) : (
            <>
              <button className="cta" onClick={handleContinue} disabled={loading}>
                {loading ? 'Please wait…' : 'Continue →'}
              </button>
              {error && <p className="error">{error}</p>}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .page {
          min-height: 100dvh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Sans', system-ui, sans-serif;
          color: #ffffff;
          background-color: #1a1a1a;
          background-image: url('/bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          position: relative;
        }
        .page::before {
          content: '';
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 0;
        }
        .card {
          position: relative;
          z-index: 1;
          width: min(420px, 92vw);
          padding: clamp(2rem, 6vw, 3.5rem) clamp(1.5rem, 5vw, 3rem);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          backdrop-filter: blur(18px) saturate(1.3);
          -webkit-backdrop-filter: blur(18px) saturate(1.3);
          text-align: center;
          animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .brand {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 8vw, 2.8rem);
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #e8d5b0;
          margin-bottom: 0.25rem;
        }
        .tagline {
          font-size: clamp(0.78rem, 2.5vw, 0.9rem);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0.65;
          margin-bottom: 2.2rem;
        }
        .divider {
          width: 40px;
          height: 1px;
          background: rgba(255, 255, 255, 0.18);
          margin: 0 auto 2rem;
        }
        .message {
          font-size: clamp(0.92rem, 2.8vw, 1rem);
          line-height: 1.65;
          opacity: 0.85;
          margin: 0 0 2rem;
        }
        .progress-wrap {
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 99px;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          width: 0%;
          background: #e8d5b0;
          border-radius: 99px;
          animation: fill 3s linear forwards;
        }
        .cta {
          display: inline-block;
          margin-top: 0.4rem;
          padding: 0.7rem 2rem;
          border: 1px solid #e8d5b0;
          border-radius: 99px;
          background: transparent;
          color: #e8d5b0;
          font-size: 0.88rem;
          font-family: inherit;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, opacity 0.2s;
          animation: fadeUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .cta:hover:not(:disabled),
        .cta:focus-visible:not(:disabled) {
          background: #e8d5b0;
          color: #1a1a1a;
          outline: none;
        }
        .cta:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .error {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: #ff6b6b;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fill {
          to {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

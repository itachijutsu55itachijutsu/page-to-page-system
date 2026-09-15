'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        background: '#0b0b0d',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <button
        onClick={handleContinue}
        disabled={loading}
        style={{
          padding: '14px 36px',
          fontSize: 16,
          fontWeight: 600,
          color: '#0b0b0d',
          background: '#f5d90a',
          border: 'none',
          borderRadius: 8,
          cursor: loading ? 'default' : 'pointer',
          opacity: loading ? 0.7 : 1,
          fontFamily: 'inherit',
        }}
      >
        {loading ? 'Please wait…' : 'Continue'}
      </button>
      {error && <p style={{ color: '#ff6b6b', fontSize: 13, margin: 0 }}>{error}</p>}
    </main>
  );
}

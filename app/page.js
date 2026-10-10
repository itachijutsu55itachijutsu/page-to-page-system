'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';

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
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>Full Video</div>
        <p className={styles.tagline}>flurze.online</p>
        <div className={styles.divider} />

        <p className={styles.message}>
          Your content is ready.
          <br />
          Tap continue when you're set.
        </p>

        {!ready ? (
          <div className={styles.progressWrap} aria-hidden="true">
            <div className={styles.progressBar} />
          </div>
        ) : (
          <>
            <button
              className={styles.cta}
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? 'Please wait…' : 'Continue →'}
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

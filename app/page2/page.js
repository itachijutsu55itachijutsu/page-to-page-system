export const metadata = {
  title: 'Page 2',
};

export default function Page2() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0b0d',
        color: '#e5e7eb',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ fontSize: 22, margin: '0 0 8px' }}>Page 2</h1>
        <p style={{ color: '#8a8f98', fontSize: 14, margin: 0 }}>
          This content only loads when you arrive here from Page 1.
        </p>
      </div>
    </main>
  );
}

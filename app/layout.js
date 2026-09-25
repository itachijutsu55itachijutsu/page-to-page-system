export const metadata = {
  title: 'Page 1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

    <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap"
    rel="stylesheet"
  />
</head>
      
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

import { DM_Sans, Playfair_Display } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-dm',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: 'Page 1',
};

export const viewport = {
  themeColor: '#1a1a1a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable}`}
      style={{ backgroundColor: '#1a1a1a', colorScheme: 'dark' }}
    >
      <head>
        <link rel="preload" as="image" href="/bg.jpg" />
      </head>
      <body style={{ margin: 0, backgroundColor: '#1a1a1a' }}>{children}</body>
    </html>
  );
}

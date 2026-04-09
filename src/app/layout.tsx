import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeWrapper from '@/components/layout/ThemeWrapper';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-thomas-bourchis.vercel.app'),

  title: 'Thomas Bourchis — Fullstack Developer',
  description:
    'Fullstack developer specialized in React, Next.js and React Native. Available for freelance and full-time positions.',
  keywords: ['fullstack developer', 'React', 'Next.js', 'React Native', 'TypeScript', 'Node.js'],
  authors: [{ name: 'Thomas Bourchis' }],
  openGraph: {
    title: 'Thomas Bourchis — Fullstack Developer',
    description:
      'Fullstack developer specialized in React, Next.js and React Native. Available for freelance and full-time positions.',
    url: 'https://portfolio-thomas-bourchis.vercel.app',
    siteName: 'Thomas Bourchis Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Bourchis — Fullstack Developer',
    description: 'Fullstack developer specialized in React, Next.js and React Native.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}>
        <ThemeProvider>
          <ThemeWrapper>
            <Header />
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

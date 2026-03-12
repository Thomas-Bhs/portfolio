import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import { Space_Mono } from 'next/font/google';
import './globals.css';

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
  title: 'Portfolio Website',
  description: 'My portfolio website built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${playfair.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

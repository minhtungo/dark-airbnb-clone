import '@/styles/globals.css';

import { Navbar } from '@/components/navbar';
import { Inter } from 'next/font/google';

const font = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Navbar />
      <body className={font.className}>{children}</body>
    </html>
  );
}

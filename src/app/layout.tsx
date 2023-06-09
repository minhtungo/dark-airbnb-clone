import '@/styles/globals.css';

import { Navbar } from '@/components/navbar';
import { Inter } from 'next/font/google';
import { mergeClassNames } from '@/lib/utils';
import { RegisterModal, LoginModal, RentModal } from '@/components/modal';
import ToasterProvider from '@/providers/ToasterProvider';
import getCurrentUser from '@/actions/getCurrentUser';
import SearchModal from '@/components/modal/SearchModal';
import ClientOnly from '@/components/ClientOnly';

const font = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
      <body
        className={mergeClassNames('bg-black text-gray-100', font.className)}
      >
        <ToasterProvider />
        <LoginModal />
        <RentModal />
        <SearchModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />

        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  );
}

'use client';

import { FC } from 'react';
import { Container } from '@/components/ui';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { User } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='fixed z-10 w-full shadow-sm'>
      <div className='border-b border-gray-800/80 py-4'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

'use client';

import { FC, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../ui/Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegister';
import useLoginModal from '@/hooks/useLogin';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/types';
import useRentModal from '@/hooks/useRent';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onRent = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-medium text-gray-100 transition hover:bg-gray-800/50 md:block'
          onClick={onRent}
        >
          Airbnb your home
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-gray-700/70 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-gray-900 text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push('/trips')}
                  label='My Trips'
                />
                <MenuItem onClick={registerModal.onOpen} label='My Favorites' />
                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
                <MenuItem
                  onClick={() => router.push('/reservations')}
                  label='My Reservations'
                />
                <hr />
                <MenuItem onClick={() => signOut()} label='Logout' />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Login' />
                <MenuItem onClick={registerModal.onOpen} label='Sign up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

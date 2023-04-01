'use client';

import { FC, useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../ui/Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //add typescript to this
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-medium text-gray-100 transition hover:bg-gray-800/50 md:block'
          onClick={toggleOpen}
        >
          Airbnb your home
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-gray-700/70 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className='absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-gray-900 text-sm shadow-md md:w-3/4'>
          <div className='flex cursor-pointer flex-col'>
            <>
              <MenuItem onClick={() => {}} label='Login' />
              <MenuItem onClick={() => {}} label='Sign up' />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

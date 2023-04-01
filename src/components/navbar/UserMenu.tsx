'use client';

import { FC } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../ui/Avatar';

interface UserMenuProps {}

const UserMenu: FC<UserMenuProps> = ({}) => {
  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-medium text-gray-100 transition hover:bg-gray-800/50 md:block'
          onClick={() => console.log('clicked')}
        >
          Airbnb your home
        </div>
        <div
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border border-gray-700/70 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={() => console.log('clicked')}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;

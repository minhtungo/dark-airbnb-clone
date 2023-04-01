'use client';

import { FC } from 'react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      className='px-4 py-3 font-medium transition hover:bg-gray-800/50'
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default MenuItem;

'use client';

import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  return (
    <div className='w-full cursor-pointer rounded-full border border-gray-800/90 py-2 shadow-sm transition hover:shadow-md md:w-auto'>
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-medium'>Anywhere</div>
        <div className='hidden flex-1 border-x px-6 text-center text-sm font-medium sm:block'>
          Any Week
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-300'>
          <div className='hidden sm:block'>Add Guest</div>
          <div className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

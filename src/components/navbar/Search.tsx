'use client';

import useCountries from '@/hooks/useCountries';
import useSearchModal from '@/hooks/useSearch';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  return (
    <div
      onClick={searchModal.onOpen}
      className='w-full cursor-pointer rounded-full border border-gray-800/90 py-2 shadow-sm transition hover:shadow-md md:w-auto'
    >
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

'use client';

import useCountries from '@/hooks/useCountries';
import useSearchModal from '@/hooks/useSearch';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchProps {}

const Search: FC<SearchProps> = ({}) => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const location = params?.get('location');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');

  const locationLabel = location
    ? getByValue(location as string)?.label
    : 'Anywhere';

  const durationLabel = () => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week';
  };

  const guestLabel = guestCount ? `${guestCount} Guests` : 'Add Guest';

  return (
    <div
      onClick={searchModal.onOpen}
      className='w-full cursor-pointer rounded-full border border-gray-800/90 py-2 shadow-sm transition hover:shadow-md md:w-auto'
    >
      <div className='flex flex-row items-center justify-between'>
        <div className='px-6 text-sm font-medium'>{locationLabel}</div>
        <div className='hidden flex-1 border-x px-6 text-center text-sm font-medium sm:block'>
          {durationLabel()}
        </div>
        <div className='flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-300'>
          <div className='hidden sm:block'>{guestLabel}s</div>
          <div className='rounded-full bg-rose-500 p-2 text-white'>
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

'use client';

import { mergeClassNames } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };

  return (
    <div
      className={mergeClassNames(
        'flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-300',
        selected
          ? 'border-b-neutral-300 text-neutral-300'
          : 'border-transparent text-neutral-500'
      )}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  );
};

export default CategoryBox;

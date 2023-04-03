'use client';

import { mergeClassNames } from '@/lib/utils';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={mergeClassNames(
        `
        flex
        cursor-pointer
        flex-col
        gap-3
        rounded-xl
        border-2
        p-3
        transition
        hover:border-neutral-300
      `,
        selected ? 'border-neutral-200 ' : 'border-neutral-500 '
      )}
    >
      <Icon size={24} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  );
};

export default CategoryInput;

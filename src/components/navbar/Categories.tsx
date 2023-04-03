'use client';

import { FC } from 'react';
import { Container } from '../ui';
import { categories } from '@/content/constant';
import CategoryBox from '../ui/CategoryBox';
import { usePathname, useSearchParams } from 'next/navigation';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  if (!isHomePage) return null;

  return (
    <Container>
      <div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

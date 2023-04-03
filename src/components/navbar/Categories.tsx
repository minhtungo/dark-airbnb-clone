import { FC } from 'react';
import { Container } from '../ui';
import { categories } from '@/content/constant';
import CategoryBox from '../ui/CategoryBox';

interface CategoriesProps {}

const Categories: FC<CategoriesProps> = ({}) => {
  return (
    <Container>
      <div className='flex flex-row items-center justify-between overflow-x-auto pt-4'>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

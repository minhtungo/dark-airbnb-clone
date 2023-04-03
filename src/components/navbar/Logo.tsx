'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push('/')}
      alt='Logo'
      className='hidden cursor-pointer md:block'
      height='100'
      width='100'
      src='/images/logo.png'
    />
  );
};

export default Logo;

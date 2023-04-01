import { FC } from 'react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <div className='fixed z-10 w-full bg-black shadow-sm'>
      <div className='border-b-[1px] py-4'></div>
    </div>
  );
};

export default Navbar;

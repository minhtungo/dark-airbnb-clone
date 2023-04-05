'use client';

import { ListingHead } from '@/components/listing';
import { Container } from '@/components/ui';
import { categories } from '@/content/constant';
import useLoginModal from '@/hooks/useLogin';
import { SafeListing, SafeUser } from '@/types';
import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

interface ListingClientProps {
  reservation?: Reservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({ listing, currentUser }) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);

  return (
    <Container>
      <div className='mx-auto max-w-screen-lg'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

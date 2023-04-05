'use client';

import { ListingHead, ListingInfo } from '@/components/listing';
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
          <div
            className='
              mt-6 
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10
            '
          >
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.location}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

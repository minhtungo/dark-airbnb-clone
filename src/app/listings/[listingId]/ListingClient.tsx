'use client';

import {
  ListingHead,
  ListingInfo,
  ListingReservation,
} from '@/components/listing';
import { Container } from '@/components/ui';
import { categories } from '@/content/constant';
import useLoginModal from '@/hooks/useLogin';
import { SafeListing, SafeReservation, SafeUser } from '@/types';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    const res = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      }),
    });

    if (!res.ok) {
      setIsLoading(false);
      return toast.error('Something went wrong.');
    }

    toast.success('Listing reserved!');
    setDateRange(initialDateRange);
    router.push('/trips');
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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
            <div
              className='
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              '
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;

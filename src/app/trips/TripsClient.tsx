'use client';

import { ListingCard } from '@/components/listing';
import { Container, Heading } from '@/components/ui';
import { SafeReservation, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = async (id: string) => {
    setDeletingId(id);

    const res = await fetch(`/api/reservations/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setDeletingId('');
      return toast.error('Failed to cancel reservation');
    }

    toast.success('Reservation cancelled');
    setDeletingId('');
    router.refresh();
  };
  return (
    <Container>
      <Heading
        title='Trips'
        subtitle="Where you've been and where you're going"
      />
      <div
        className='
        mt-10
          grid 
          grid-cols-1 
          gap-8 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6'
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;

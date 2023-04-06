'use client';

import { toast } from 'react-hot-toast';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '@/types';
import { Container, Heading } from '@/components/ui';
import { ListingCard } from '@/components/listing';

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
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
      <Heading title='Reservations' subtitle='Bookings on your properties' />
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
          2xl:grid-cols-6
        '
      >
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel='Cancel guest reservation'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;

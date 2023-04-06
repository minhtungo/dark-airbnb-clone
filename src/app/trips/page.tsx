import getCurrentUser from '@/actions/getCurrentUser';
import getReservations from '@/actions/getReservations';
import EmptyState from '@/components/ui/EmptyState';
import { FC } from 'react';
import TripsClient from './TripsClient';

interface TripsPageProps {}

const TripsPage = async ({}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState title='Unauthorized' subtitle='Login to see your trips' />
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return <EmptyState title='No trips found' subtitle='No trips reserved' />;
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;

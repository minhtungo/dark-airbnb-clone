import getCurrentUser from '@/actions/getCurrentUser';
import getListingById from '@/actions/getListingById';
import EmptyState from '@/components/ui/EmptyState';
import { FC } from 'react';
import ListingClient from './ListingClient';
import getReservations from '@/actions/getReservations';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
};

export default ListingPage;

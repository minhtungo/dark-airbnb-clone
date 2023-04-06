import getCurrentUser from '@/actions/getCurrentUser';
import getListings, { IListingsParams } from '@/actions/getListings';
import { ListingCard } from '@/components/listing';
import { Container } from '@/components/ui';
import EmptyState from '@/components/ui/EmptyState';

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({
  searchParams,
}: {
  searchParams: IListingsParams;
}) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className='grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}

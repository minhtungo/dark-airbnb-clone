'use client';

import { ListingCard } from '@/components/listing';
import { Container, Heading } from '@/components/ui';
import { SafeListing, Safelisting, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'react-hot-toast';

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser: SafeUser | null;
}

const PropertiesClient: FC<PropertiesClientProps> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = async (id: string) => {
    setDeletingId(id);

    const res = await fetch(`/api/listings/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      setDeletingId('');
      return toast.error('Failed to cancel listing');
    }

    toast.success('Deleted listing');
    setDeletingId('');
    router.refresh();
  };
  return (
    <Container>
      <Heading title='Properties' subtitle='List of your properties' />
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
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing.listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel='Delete property'
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import { SafeUser } from '@/types';

import useLoginModal from './useLogin';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorited) {
        request = () =>
          fetch(`/api/favorites/${listingId}`, {
            method: 'DELETE',
          });
      } else {
        request = () =>
          fetch(`/api/favorites/${listingId}`, {
            method: 'POST',
          });
      }

      await request();
      router.refresh();
      toast.success('Add to favorite');
    } catch (error) {
      toast.error('Something went wrong.');
    }
  };

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;

'use client';

import { FC, useMemo, useState } from 'react';
import Modal from './Modal';
import useSearchModal from '@/hooks/useSearch';
import { useRouter, useSearchParams } from 'next/navigation';
import CountrySelect, { CountrySelectValue } from '../input/CountrySelect';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import { Heading } from '../ui';
import { Calendar, Counter } from '../input';

interface SearchModalProps {}

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal: FC<SearchModalProps> = ({}) => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(
    () =>
      dynamic(() => import('../ui/Map'), {
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit = async () => {
    if (step !== STEPS.INFO) {
      onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      location: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  const actionLabel = step === STEPS.INFO ? 'Search' : 'Next';

  const secondaryActionLabel = step === STEPS.LOCATION ? undefined : 'Back';

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Where do you wanna go?'
        subtitle='Find the perfect location!'
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='When do you plan to go?'
          subtitle='Make sure everyone is free!'
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading title='More information' subtitle='Find your perfect place!' />
        <Counter
          onChange={(value) => setGuestCount(value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests are coming?'
        />
        <hr />
        <Counter
          onChange={(value) => setRoomCount(value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you need?'
        />
        <hr />
        <Counter
          onChange={(value) => {
            setBathroomCount(value);
          }}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bathrooms do you need?'
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title='Filters'
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;

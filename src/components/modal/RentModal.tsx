'use client';

import { FC, useMemo, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/hooks/useRent';
import { Heading, Input } from '@/components/ui';
import { categories } from '@/content/constant';
import {
  CategoryInput,
  Counter,
  CountrySelect,
  ImageUpload,
} from '@/components/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const defaultValues = {
  category: '',
  location: null,
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: '',
  price: 1,
  title: '',
  description: '',
};

interface RentModalProps {}

const RentModal: FC<RentModalProps> = ({}) => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(
    () =>
      dynamic(() => import('../ui/Map'), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (name: string, value: any) => {
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((prev) => prev - 1);
  };

  const onNext = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    const res = await fetch('/api/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error('Something went wrong.');
      return setIsLoading(false);
    }

    toast.success('Listing created!');
    router.refresh();
    reset();
    setStep(STEPS.CATEGORY);
    rentModal.onClose();
    return setIsLoading(false);
  };

  const actionLabel = step === STEPS.PRICE ? 'Create' : 'Next';

  const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : 'Back';

  let bodyContent = (
    <div className='flex flex-col gap-8'>
      <Heading
        title='Which of these best describes your place?'
        subtitle='Pick a category'
      />
      <div
        className='
          grid 
          max-h-[50vh] 
          grid-cols-1 
          gap-3
          overflow-y-auto
          md:grid-cols-2
        '
      >
        {categories.map((item) => (
          <div key={item.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is your place located?'
          subtitle='Help guests find you!'
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Share some basics about your place'
          subtitle='What amenitis do you have?'
        />
        <Counter
          onChange={(value) => setCustomValue('guestCount', value)}
          value={guestCount}
          title='Guests'
          subtitle='How many guests do you allow?'
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title='Rooms'
          subtitle='How many rooms do you have?'
        />
        <hr />
        <Counter
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title='Bathrooms'
          subtitle='How many bathrooms do you have?'
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Add a photo of your place'
          subtitle='Show guests what your place looks like!'
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='How would you describe your place?'
          subtitle='Short and sweet works best!'
        />
        <Input
          id='title'
          label='Title'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id='description'
          label='Description'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Now, set your price'
          subtitle='How much do you charge per night?'
        />
        <Input
          id='price'
          label='Price'
          formatPrice
          type='number'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RentModal;

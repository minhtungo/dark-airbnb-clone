'use client';

import { FC, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/hooks/useRent';
import { Heading } from '../ui';
import { categories } from '@/content/constant';
import { CategoryInput } from '@/components/input';
import { FieldValues, useForm } from 'react-hook-form';

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
  const rentModal = useRentModal();

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

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title='Airbnb your home'
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;

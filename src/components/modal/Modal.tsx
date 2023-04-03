'use client';

import { FC, useState, useEffect } from 'react';
import Button from '../ui/Button';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    if (disabled) {
      return;
    }

    onSubmit();
  };

  const handleSecondaryAction = () => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/25 outline-none focus:outline-none'>
        <div className='relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5'>
          {/* Content */}
          <div
            className={`
            translate
            h-full
            duration-300
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
          >
            <div
              className='
              translate
              relative
              flex
              h-full
              w-full 
              flex-col 
              rounded-lg 
              border-0 
              bg-neutral-900 
              shadow-lg 
              outline-none 
              focus:outline-none 
              md:h-auto 
              lg:h-auto
            '
            >
              {/*header*/}
              <div
                className='
                relative 
                flex 
                items-center
                justify-center
                rounded-md
                border-b
                border-neutral-800
                p-6
                '
              >
                <button
                  className='
                    absolute
                    left-9 
                    border-0
                    p-1
                    transition
                    hover:opacity-70
                  '
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold'>{title}</div>
              </div>
              {/*body*/}
              <div className='relative flex-auto p-6'>{body}</div>
              {/*footer*/}
              <div className='flex flex-col gap-1 p-6'>
                <div
                  className='
                    flex 
                    w-full 
                    flex-row 
                    items-center 
                    gap-3
                  '
                >
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

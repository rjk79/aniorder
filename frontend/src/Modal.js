import React from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Dialog } from '@headlessui/react';

const Modal = (props) => {
  const { children, closeModal, modal } = props;

  return (
    <Dialog
      open={!!modal}
      onClose={closeModal}
      className="flex justify-center items-center px-2 fixed z-30 inset-0 overflow-y-auto">
      <Dialog.Overlay className="fixed w-full h-full bg-black bg-opacity-50" />
      <div
        className={
          'relative mx-auto w-full sm:w-1/2 bg-white rounded-lg p-5 shadow-lg dark:bg-white dark:text-black'
        }>
        <XIcon
          className="z-10 absolute top-2 right-2 w-7 h-7 cursor-pointer"
          onClick={closeModal}
        />
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;

"use client";

import { createContext, useEffect, useState } from "react";

type ModalContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

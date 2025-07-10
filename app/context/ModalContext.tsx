"use client";

import { createContext, useCallback, useEffect, useState } from "react";

type ModalContextType = {
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  isModalOpen: (id: string) => boolean;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: true }));
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prev) => ({ ...prev, [id]: false }));
  }, []);

  const isModalOpen = useCallback((id: string) => !!modals[id], [modals]);

  useEffect(() => {
    const isAnyModalOpen = Object.values(modals).some((state) => state);
    document.body.classList.toggle("overflow-hidden", isAnyModalOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [modals]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };

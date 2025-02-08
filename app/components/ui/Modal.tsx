"use client";

import { createPortal } from "react-dom";
import Button from "./Button";
import { useEffect, useState } from "react";

type ModalProps = {
  maxWidth: string;
  buttonName: string;
  color?: "blue" | "gray" | "red" | "white";
  size?: "normal" | "small" | "auth";
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  maxWidth,
  buttonName,
  color = "blue",
  size = "normal",
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

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
    <>
      <Button onClick={toggleModal} color={color} size={size}>
        {buttonName}
      </Button>
      {isModalOpen &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-gray-500 bg-opacity-90"
          >
            <div
              className={`relative w-full mx-2 p-4 border rounded border-gray-500 bg-white ${maxWidth}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;

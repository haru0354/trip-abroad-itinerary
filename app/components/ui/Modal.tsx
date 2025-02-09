"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

import Button from "./Button";
import ButtonImage from "./ButtonImage";

type ModalProps = {
  maxWidth: string;
  buttonName: string;
  closeButtonName?: string;
  paddingNothing?: boolean;
  color?: "blue" | "gray" | "red" | "white";
  size?: "normal" | "small" | "auth";
  iconButton?: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({
  maxWidth,
  buttonName,
  closeButtonName = "閉じる",
  paddingNothing = false,
  color = "blue",
  size = "normal",
  iconButton = false,
  children,
}) => {
  const padding = paddingNothing ? "" : "p-4";
  const closeButtonPosition = paddingNothing ? "my-4" : "";

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
      {iconButton ? (
        <div className="w-full h-full">
          <ButtonImage icon="plus" size="footer" onClick={toggleModal}>
            {buttonName}
          </ButtonImage>
        </div>
      ) : (
        <Button
          onClick={toggleModal}
          color={color}
          size={size}
          className="rounded my-4"
        >
          {buttonName}
        </Button>
      )}

      {isModalOpen &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed flex justify-center items-center w-full h-full top-0 left-0 bg-gray-500 bg-opacity-90"
          >
            <div
              className={`relative w-full mx-2 border rounded border-gray-500 bg-white ${padding} ${maxWidth}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              <Button
                onClick={toggleModal}
                color="gray"
                size="normal"
                className={`rounded ${closeButtonPosition}`}
              >
                {closeButtonName}
              </Button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;

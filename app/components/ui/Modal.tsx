"use client";

import { createPortal } from "react-dom";

import Button from "./Button";
import ButtonImage from "./ButtonImage";
import { useModal } from "@/app/hooks/useModal";

type ModalProps = {
  maxWidth: string;
  buttonName: string;
  closeButtonName?: string;
  paddingNothing?: boolean;
  color?: "blue" | "gray" | "red" | "white";
  size?: "normal" | "small" | "auth";
  iconButton?: boolean;
  textButton?: boolean;
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
  textButton = false,
  children,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const padding = paddingNothing ? "" : "p-4";
  const closeButtonPosition = paddingNothing ? "my-4" : "";

  return (
    <>
      {iconButton ? (
        <div className="w-full h-full">
          <ButtonImage icon="plus" size="footer" onClick={openModal}>
            {buttonName}
          </ButtonImage>
        </div>
      ) : (
        <>
          {textButton ? (
            <p onClick={openModal} className="cursor-pointer mb-0">
              {buttonName}
            </p>
          ) : (
            <Button
              onClick={openModal}
              color={color}
              size={size}
              className="rounded my-4"
            >
              {buttonName}
            </Button>
          )}
        </>
      )}

      {isModalOpen &&
        createPortal(
          <div
            onClick={closeModal}
            className="fixed flex z-[200] justify-center items-center w-full h-full top-0 left-0  bg-gray-500 bg-opacity-90"
          >
            <div
              className={`relative w-full mx-2 border rounded border-gray-500  max-h-[70vh]  overflow-y-auto bg-white ${padding} ${maxWidth}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              <Button
                onClick={closeModal}
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

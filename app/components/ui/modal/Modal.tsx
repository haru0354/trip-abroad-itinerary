"use client";

import { createPortal } from "react-dom";

import { useModal } from "@/app/hooks/useModal";
import Button from "../button/Button";
import ButtonImage from "../button/ButtonImage";
import AnimatedItem from "@/app/lib/animation/AnimatedItem";
import CloseButton from "../button/CloseButton";

type ModalProps = {
  id: string;
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
  id,
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
  const closeButtonPosition = paddingNothing ? "my-4" : "my-4";

  return (
    <>
      {iconButton ? (
        <div className="w-full h-full">
          <ButtonImage
            icon="plus"
            size="footer"
            type="button"
            onClick={() => openModal(id)}
          >
            {buttonName}
          </ButtonImage>
        </div>
      ) : (
        <>
          {textButton ? (
            <p onClick={() => openModal(id)} className="cursor-pointer mb-0">
              {buttonName}
            </p>
          ) : (
            <Button
              onClick={() => openModal(id)}
              color={color}
              size={size}
              type="button"
              className="rounded my-4"
            >
              {buttonName}
            </Button>
          )}
        </>
      )}
      {isModalOpen(id) &&
        createPortal(
          <AnimatedItem
            onClick={() => closeModal(id)}
            className="fixed flex z-[200] justify-center items-center w-full h-full top-0 left-0 px-2 bg-gray-500 bg-opacity-90"
            elementType="div"
            animation="fadeInVariants"
          >
            <div
              className={`relative w-full border rounded border-gray-500 max-h-[70vh] overflow-y-auto bg-white ${padding} ${maxWidth}`}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              <CloseButton onClick={() => closeModal(id)} className="absolute top-2 right-2"/>
              <Button
                onClick={() => closeModal(id)}
                color="gray"
                size="normal"
                type="button"
                className={`rounded ${closeButtonPosition}`}
              >
                {closeButtonName}
              </Button>
            </div>
          </AnimatedItem>,
          document.body
        )}
    </>
  );
};

export default Modal;

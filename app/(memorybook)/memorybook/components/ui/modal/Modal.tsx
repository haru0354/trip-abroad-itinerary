"use client";

import { useCallback } from "react";
import Button from "@/app/components/ui/Button";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  primaryLabel: string;
  secondaryAction?: () => void;
  secondaryLabel?: string;
  disabled?: boolean;
  del?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  primaryLabel,
  secondaryAction,
  secondaryLabel,
  disabled,
  del = false,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) {
    return null;
  }

  const closeModal = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        className="bg-gray-200  bg-opacity-40 fixed z-50 w-full h-full flex justify-center items-center inset-0"
      >
        <div className="border rounded mx-auto bg-white w-[350px]">
          <div className="p-3">
            <div onClick={handleClose}></div>
            <div className="text-center border-b font-bold pb-2">{title}</div>
          </div>
          <div className="mb-8">{body}</div>
          <div>
            <div className="px-4">
              {secondaryAction && secondaryLabel && (
                <Button
                  onClick={handleSecondaryAction}
                  color="blue"
                  size="auth"
                  className="rounded mt-4"
                >
                  {secondaryLabel}
                </Button>
              )}

              <Button
                onClick={handleSubmit}
                color="blue"
                size="auth"
                className="rounded mt-4"
              >
                {primaryLabel}
              </Button>
            </div>
            {footer}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

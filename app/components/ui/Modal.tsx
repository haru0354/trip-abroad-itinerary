"use client";

import { useCallback } from "react";

type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  onsubmit: () => void;
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
  onsubmit,
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
  }, [onsubmit, disabled]);

  return <div>Modal</div>;
};

export default Modal;

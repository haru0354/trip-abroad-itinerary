"use client";

import { useCallback } from "react";
import AuthButton from "./AuthButton";

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
  // モーダルを閉じる
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  // メインボタンのアクション
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  // サブボタンのアクション
  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [secondaryAction, disabled]);

  // オープンしていない場合は何も表示しない
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div onClick={handleClose}></div>
                <div>{title}</div>
              </div>
              <div>{body}</div>
              <div>
                <div>
                  {secondaryAction && secondaryLabel && (
                    <AuthButton
                    disabled={disabled}
                    label={secondaryLabel}
                    onClick={handleSecondaryAction}
                    outline             
                    />
                  )}
                      <AuthButton
                    disabled={disabled}
                    label={primaryLabel}
                    onClick={handleSubmit}
                    del={del}             
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

"use client";

import { useFormStatus } from "react-dom";

type ButtonChildren = {
  children: React.ReactNode;
  formAction?: (data: FormData) => Promise<void> | Promise<never> | null;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonChildren> = ({
  children,
  formAction,
  onClick,
  className
}) => {
  const { pending } = useFormStatus();
  {`btn ${className}`}
  return (
    <button
      className={`${className} ${
        pending ? "opacity-30" : ""
      }`}
      type="submit"
      formAction={formAction}
      disabled={pending}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

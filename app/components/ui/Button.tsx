"use client";

import { useFormStatus } from "react-dom";

type ButtonProps = {
  children: React.ReactNode;
  formAction?: (data: FormData) => Promise<{ message: string ; } | undefined> ;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  formAction,
  onClick,
  className,
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

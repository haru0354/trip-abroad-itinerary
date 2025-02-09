"use client";

import { useFormStatus } from "react-dom";

type ButtonProps = {
  children: React.ReactNode;
  formAction?: (data: FormData) => Promise<{ message: string } | undefined>;
  onClick?: () => void;
  className?: string;
  color: "blue" | "gray" | "red" | "white";
  size: "normal" | "small" | "auth";
};

const Button: React.FC<ButtonProps> = ({
  children,
  formAction,
  onClick,
  className,
  color,
  size,
}) => {
  const { pending } = useFormStatus();

  const colors = {
    blue: "border-sky-900 bg-sky-700",
    gray: "border-gray-900 bg-gray-700",
    red: "border-red-900 bg-red-700",
    white: "border-gray-900 bg-gray-500",
  };

  const sizes = {
    normal: "min-w-[170px] px-10 py-2 block mx-auto",
    small: "min-w-[100px] px-6 py-1 mx-2",
    auth: "min-w-[220px] px-10 py-2 block mx-auto"
  };

  return (
    <button
      className={`font-bold border shadow text-white hover:text-black hover:bg-white transition duration-300
      ${className} 
      ${colors[color]} 
      ${sizes[size]} 
      ${pending ? "opacity-30" : ""}`}
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

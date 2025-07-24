"use client";

import { useFormStatus } from "react-dom";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button";
  color: "blue" | "gray" | "red" | "white";
  size: "normal" | "small" | "auth";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = "submit",
  color,
  size,
}) => {
  const { pending } = useFormStatus();

  const colors = {
    blue: "text-white hover:text-black border-sky-900 bg-sky-700 hover:bg-white",
    gray: "text-white hover:text-black border-gray-900 bg-gray-700 hover:bg-white",
    red: "text-white hover:text-black border-red-900 bg-red-700 hover:bg-white",
    white: "text-black hover:text-white border-gray-900 bg-gray-200 hover:bg-gray-700",
  };

  const sizes = {
    normal: "min-w-[170px] px-10 py-2 block mx-auto",
    small: "min-w-[100px] px-6 py-1 mx-2",
    auth: "min-w-[220px] px-10 py-2 block mx-auto",
  };

  return (
    <button
      className={`font-bold border shadow   transition duration-300
      ${className} 
      ${colors[color]} 
      ${sizes[size]} 
      ${pending ? "opacity-30" : ""}`}
      type={type}
      disabled={pending}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

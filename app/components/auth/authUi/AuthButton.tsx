"use client";

type ButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  del?:  boolean;
  className?: string;
  label?: string;
};

const AuthButton: React.FC<ButtonProps> = ({
  onClick,
  className,
  disabled,
  outline,
  del,
  label,
}) => {
  return (
    <button
      className={`${className} ${
        outline
          ? 'border-neutral-400 bg-white text-black'
          : del
          ? 'border-red-400 bg-red-400 text-white'
          : 'border-sky-400 bg-sky-400 text-white'
      }`}
      disabled={disabled}
      onClick={onClick}    
    >
    {label} 
    </button>
  );
};

export default AuthButton;

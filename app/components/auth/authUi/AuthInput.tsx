"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: any;
};


const AuthInput: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors,
}) => {
  return (
    <div>
        <div>
            {label}
        </div>
        <input
        id={id}
        disabled={disabled}
        {...register(id,{ required })}
        placeholder=""
        type={type}
        className={`
            ${
        errors[id]
            ? 'border-red-500 focus:border-red-500'
            : 'border-neutral-300 focus:border-sky-500'
        }`}
        />
    </div>
  )
}

export default AuthInput

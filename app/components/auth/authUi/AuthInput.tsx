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
    <div className="px-4">
        <div className="block text-gray-600 text-sm font-bold  mb-1 mt-4">
            {label}
        </div>
        <input
        id={id}
        disabled={disabled}
        {...register(id,{ required })}
        placeholder=""
        type={type}
        className={`shadow border rounded w-full py-2 px-4
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

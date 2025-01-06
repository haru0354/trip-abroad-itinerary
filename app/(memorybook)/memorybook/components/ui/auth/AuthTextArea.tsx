"use client";

import { FieldValues, UseFormRegister } from "react-hook-form";

type AuthTextAreaProps = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: any;
};

const AuthTextArea: React.FC<AuthTextAreaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div>
      <div>{label}</div>
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        rows={5}
        className={`
            ${
              errors[id]
                ? "border-red-500 focus:border-red-500"
                : "border-neutral-300 focus:border-sky-500"
            }`}
      />
      {errors[id] && <div>{errors[id].message}</div>}
    </div>
  );
};

export default AuthTextArea;

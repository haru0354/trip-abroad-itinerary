import { ChangeEventHandler } from "react";

type InputImageProps = {
  name: string;
  label: string;
  error?: string | string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  register: any;
  required?: boolean;
};

const InputImage: React.FC<InputImageProps> = ({
  name,
  label,
  error,
  onChange,
  register,
  required,
}) => {
  const errorFiledColor = error ? "border rounded border-red-500" : "";

  return (
    <>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type="file"
        id={label}
        name={name}
        onChange={onChange}
        className={`w-full py-2 px-3 ${errorFiledColor}`}
        {...register(name, {
          required: required && `${label}の選択は必須です。`,
        })}
      />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </>
  );
};

export default InputImage;

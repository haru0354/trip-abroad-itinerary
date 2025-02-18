type InputProps = {
  name: string;
  label: string;
  placeholder: string;
  register: any;
  type?: string;
  defaultValue?: string | number | readonly string[] | null | undefined;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  error?: string | string[];
  pattern?: "email";
};

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  label,
  placeholder,
  defaultValue,
  register,
  required,
  maxLength,
  minLength,
  error,
  pattern,
}) => {
  const borderColor = error ? "border-red-500" : "border-gray-300";

  return (
    <>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={`w-full py-2 px-3 shadow border rounded ${borderColor} `}
        {...register(name, {
          required: required && `${label}の入力は必須です。`,
          maxLength: maxLength && {
            value: maxLength,
            message: `${label}は最大${maxLength}文字以下で入力してください。`,
          },
          minLength: minLength && {
            value: minLength,
            message: `${label}は${minLength}文字以上で入力してください。`,
          },
          pattern: pattern &&
            pattern === "email" && {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "メールアドレスを入力してください",
            },
        })}
      />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </>
  );
};

export default Input;

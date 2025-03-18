import TextareaAutosize from "react-textarea-autosize";

type TextAreaProps = {
  name: string;
  label: string;
  placeholder: string;
  register: any;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  error?: string | string[];
};

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  placeholder,
  register,
  defaultValue,
  rows = 3,
  required,
  maxLength,
  minLength,
  error,
}) => {
  const borderColor = error ? "border-red-500" : "border-gray-300";

  return (
    <>
      <label htmlFor={label} className="block mb-1 mt-4 text-sm font-bold">
        {label}
      </label>
      <TextareaAutosize
        className={`w-full min-h-[100px] h-26 py-2 px-3 border rounded shadow ${borderColor}`}
        name={name}
        id={label}
        placeholder={placeholder}
        defaultValue={defaultValue}
        minRows={rows}
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
        })}
      />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </>
  );
};

export default TextArea;

type InputProps = {
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  type?: string;
  defaultValue?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  defaultValue,
  type = "text",
}) => {
  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type={type}
        className="w-full py-2 px-3 shadow border rounded"
        id={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;

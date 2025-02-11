type DateProps = {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  label?: string;
  register: any;
  required?: boolean;
};

const Date: React.FC<DateProps> = ({
  name,
  value,
  onChange,
  defaultValue,
  register,
  required,
  label = "日付:",
}) => {
  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type="date"
        id={label}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        {...register(name, {
          required: required && `${label}の入力は必須です。`,
        })}
      />
    </div>
  );
};

export default Date;

type DateProps = {
  name: string;
  label: string;
  register: any;
  defaultValue?: string;
  required?: boolean;
  error?: string | string[];
};

const Date: React.FC<DateProps> = ({
  name,
  label,
  register,
  defaultValue,
  required,
  error,
}) => {
  const borderColor = error ? " border-red-500" : "border-gray-300";

  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        type="date"
        id={label}
        name={name}
        defaultValue={defaultValue}
        {...register(name, {
          required: required && `${label}の入力は必須です。`,
        })}
        className={`py-1 px-2 shadow border rounded ${borderColor}`}
      />
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </div>
  );
};

export default Date;

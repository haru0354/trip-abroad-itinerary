type SelectProps = {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  categories?: Category[] | null;
  defaultValue?: string;
  post?: Category | null;
  error?: string | string[];
};

type Category = {
  id: string;
  name: string;
};

const Select: React.FC<SelectProps> = ({
  label,
  name,
  register,
  required,
  categories,
  defaultValue,
  error,
}) => {
  const errorBorderColor = error ? " border-red-500" : "border-gray-300";

  return (
    <div>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <select
        className={`py-2 px-3 border rounded shadow ${errorBorderColor}`}
        name={name}
        defaultValue={defaultValue}
        {...register(name, {
          required: required && `${label}の入力は必須です。`,
        })}
      >
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </div>
  );
};

export default Select;

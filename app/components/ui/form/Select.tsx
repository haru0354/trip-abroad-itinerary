type SelectProps = {
  label: string;
  name: string;
  register: any;
  required?: boolean;
  categories?: Category[] | null;
  defaultValue?: number;
  post?: Category | null;
};

type Category = {
  id: number;
  name: string;
};

const Select: React.FC<SelectProps> = ({
  label,
  name,
  register,
  required,
  categories,
  defaultValue,
}) => {
  return (
    <>
      <label className="block mb-1 mt-4 text-sm font-bold" htmlFor={label}>
        {label}
      </label>
      <select
        className="py-2 px-3 border rounded shadow"
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
    </>
  );
};

export default Select;

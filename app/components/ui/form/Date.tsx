type DateProps = {
  name: string;
  label: string;
  register: any;
  defaultValue?: string;
  required?: boolean;
};

const Date: React.FC<DateProps> = ({
  name,
  label,
  register,
  defaultValue,
  required,
}) => {
  return (
    <>
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
      />
    </>
  );
};

export default Date;

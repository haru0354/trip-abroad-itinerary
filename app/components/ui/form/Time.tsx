type TimeProps = {
  name: string;
  label: string;
  register: any;
  defaultValue?: string;
  required?: boolean;
};

const Time: React.FC<TimeProps> = ({
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
        type="time"
        name={name}
        id={label}
        defaultValue={defaultValue}
        className="py-2 px-2 border rounded shadow"
        {...register(name, {
          required: required && `${label}の入力は必須です。`,
        })}
      />
    </>
  );
};

export default Time;

type TimeProps = {
  name: string;
  label: string;
  register: any;
  defaultValue?: string;
  required?: boolean;
  error?: string | string[];
};

const Time: React.FC<TimeProps> = ({
  name,
  label,
  register,
  defaultValue,
  required,
  error,
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
      {error && <p className="text-red-500 text-sm my-2">{error}</p>}
    </>
  );
};

export default Time;

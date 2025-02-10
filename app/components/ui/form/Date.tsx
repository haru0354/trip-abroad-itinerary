type DateProps = {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  label?: string;
};

const Date: React.FC<DateProps> = ({
  name,
  value,
  onChange,
  defaultValue,
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
        className="py-2 px-2 shadow border rounded "
      />
    </div>
  );
};

export default Date;

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
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type="date"
        id={label}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        className="shadow border rounded py-2 px-2"
      />
    </div>
  );
};

export default Date;

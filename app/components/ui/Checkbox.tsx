type CheckboxProps = {
  name: string;
  item: string;
  label?: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  item,
  label,
  checked,
  onChange,
}) => {
  return (
    <>
      <p className="block text-gray-600 text-sm font-bold  mb-1 mt-4">
        {label}
      </p>
      <p className="mt-2 text-gray-600">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
        />
        {item}
      </p>
    </>
  );
};

export default Checkbox;

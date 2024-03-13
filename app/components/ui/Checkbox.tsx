type CheckboxProps = {
  name: string;
  item: string;
  label: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  explanation?: string;
  explanation2?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  item,
  label,
  checked,
  onChange,
  explanation,
  explanation2,
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
      {checked && (
        <div className="my-6 text-sm p-2 text-gray-600 border-gray-600 border border-dashed ">
          {explanation}
          <p className="text-red-500">{explanation2}</p>
        </div>
      )}
    </>
  );
};

export default Checkbox;

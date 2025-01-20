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
      <p className="block mb-1 mt-4 text-sm font-bold">
        {label}
      </p>
      <p className="my-2">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mr-2"
        />
        {item}
      </p>
      {explanation && checked && (
        <div className="my-6 p-2 text-sm  border border-dashed border-itinerary-borderBlack">
          {explanation}
          <p className="mb-0 text-red-500">{explanation2}</p>
        </div>
      )}
    </>
  );
};

export default Checkbox;

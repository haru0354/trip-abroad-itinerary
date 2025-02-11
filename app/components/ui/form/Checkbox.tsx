type CheckboxProps = {
  name: string;
  item: string;
  label: string;
  checked: boolean;
  register: any;
  required?: boolean;
  explanation?: string;
  explanation2?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  item,
  label,
  checked,
  register,
  required,
  explanation,
  explanation2,
}) => {
  return (
    <>
      <label className="block mb-1 mt-4 text-sm font-bold">{label}</label>
      <p className="my-2">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          className="mr-2"
          {...register(name, {
            required: required && `${label}の入力は必須です。`,
          })}
        />
        {item}
      </p>
      {explanation && checked && (
        <div className="my-6 p-2 text-sm border border-dashed border-itinerary-borderBlack">
          {explanation}
          <p className="mb-0 text-red-500">{explanation2}</p>
        </div>
      )}
    </>
  );
};

export default Checkbox;

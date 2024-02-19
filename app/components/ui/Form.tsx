
type FormProps = {
  name?: string;
  label: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string | number | readonly string[] | undefined; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Form: React.FC<FormProps> = ({ name, label, placeholder, value, onChange, defaultValue }) => {
    return (
        <div>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type="text"
        className="shadow border rounded w-full py-2 px-3"
        id={label}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
    
  );
};

export default Form;

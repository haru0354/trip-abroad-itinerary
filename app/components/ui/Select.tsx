type SelectProps = {
  label: string;
  name: string;
  categories?: Category[] | null;
  defaultValue?: number;
  post?: Category | null;

};

type Category = {
  id: number;
  name: string;
}

const Select: React.FC<SelectProps> = ({ label, name, categories, defaultValue }) => {
  return (
    <>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor={label}
      >
        {label}
      </label>
      <select className="shadow border rounded py-2 px-3" name={name} defaultValue={defaultValue}>
        {categories?.map((category) => (
          <option key={category.id} value={category.id} >
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;

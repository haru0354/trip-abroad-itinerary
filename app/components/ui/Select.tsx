import prisma from "../lib/prisma";

type SelectProps = {
  label: string;
  name: string;
};

const Select: React.FC<SelectProps> = async ({ label, name }) => {

  const categories = await prisma.category.findMany();

  return (
    <>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor={label}
      >
        {label}
      </label>
      <select className="shadow border rounded py-2 px-3" name={name} >
        {categories.map((category) => (
          <option key={category.id} value={category.id} >
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;

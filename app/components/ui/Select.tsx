import prisma from "../lib/prisma";

type SelectProps = {
  name: string;
  label: string;
  defaultValue?: string;
};

const Select: React.FC<SelectProps> = async ({ label, defaultValue, name }) => {
  const posts = await prisma.post.findMany();

  const onceCategories = new Set(posts.map((post) => post.category));
  const onceCategoriesArray = Array.from(onceCategories);

  return (
    <>
      <label
        className="block text-gray-600 text-sm font-bold  mb-1 mt-4"
        htmlFor={label}
      >
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="shadow border rounded py-2 px-3"
      >
        {onceCategoriesArray.map((category) => {
          return <option key={category}>{category}</option>;
        })}
      </select>
    </>
  );
};

export default Select;

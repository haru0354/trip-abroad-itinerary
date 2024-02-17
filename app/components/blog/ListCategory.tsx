import prisma from "@/app/components/lib/prisma";
import Button from "../ui/Button";
import Link from "next/link";

const ListCategory= async () => {
  const categories = await prisma.category.findMany();

  return (
    <>
    <div className="mb-10">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className="flex border-b border-gray-500 py-4"
          >
            <p className="border-r border-gray-500 py-1 px-2 min-w-[110px]">
              {category.name}
            </p>
            <p className="flex-grow border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
              {category.slag}
            </p>
          </div>
        );
      })}
    </div>
    </>
  );
};

export default ListCategory;

import prisma from "@/app/components/lib/prisma";
import Button from "../../ui/Button";
import Link from "next/link";

const ListCategory = async () => {
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
              <p className="border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
                {category.slug}
              </p>
              <p className="border-r border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
                {category.content}
              </p>
              <p className="border-gray-500 py-1 px-2 min-w-[110px] max-w-[550px]">
                {category.description}
              </p>
              <Link href={`/${category.slug}`}>
                <Button className="min-w-[100px] px-6 py-1 mx-2 shadow font-bold bg-blue-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  ページへ
                </Button>
              </Link>
              <Link href={`/dashboard/category/${category.id}`}>
                <Button className="min-w-[100px] px-6 py-1 shadow font-bold bg-gray-700 text-white hover:bg-white hover:text-black border border-sky-900">
                  編集
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListCategory;

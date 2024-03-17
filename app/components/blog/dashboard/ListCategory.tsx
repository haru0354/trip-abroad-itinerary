import prisma from "@/app/components/lib/prisma";
import Button from "../../ui/Button";
import Link from "next/link";

const ListCategory = async () => {
  const categories = await prisma.category.findMany();

  return (
    <>
      <h2 className="bg-gray-700 text-xl bold text-white rounded mb-12 p-5 font-bold">
        カテゴリの一覧
      </h2>
      <div className="flex flex-col border border-gray-500 sm:flex-row py-4 items-center w-full sm:w-auto">
        <p className="sm:border-r border-gray-500  w-full mb-0 px-2 sm:w-auto min-w-[120px]">
          カテゴリ名
        </p>
        <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto min-w-[120px]">
          スラッグ
        </p>
        <p className=" flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto  min-w-[250px] max-w-[650px]">
          説明文
        </p>
      </div>
      <div className="mb-10">
        {categories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between flex-col sm:flex-row border-b border-gray-500 w-full"
            >
              <div className="flex flex-col  sm:flex-row py-4 items-center w-full sm:w-auto">
                <p className="sm:border-r border-gray-500  w-full mb-0 px-2 sm:w-auto min-w-[120px]">
                  {category.name}
                </p>
                <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto min-w-[120px]">
                  {category.slug}
                </p>
                <p className="mb-0 px-2 w-full sm:w-auto min-w-[250px] max-w-[650px]">
                  {category.description && category.description.length > 72
                    ? `${category.description.slice(0, 72)}...`
                    : category.description}
                </p>
              </div>
              <div className="flex sm:justify-end items-center my-4 sm:max-w-[240px]">
                <Link href={`/${category.slug}`}>
                  <Button color="blue" size="small">
                    ページ
                  </Button>
                </Link>
                <Link href={`/dashboard/category/${category.id}`}>
                  <Button color="gray" size="small">
                    編集
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListCategory;

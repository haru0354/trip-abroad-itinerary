import Link from "next/link";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import Button from "@/app/components/ui/Button";

const ListCategory = async () => {
  const categories = await getCategories();

  const sortedCategories = categories.sort((a, b) => a.id - b.id);

  return (
    <>
      <h2 className="mb-12 p-5 text-xl font-bold rounded text-white bg-blog-dashboardHeading">
      カテゴリの一覧
      </h2>
      <div className="flex flex-col border border-gray-500 sm:flex-row py-4 items-center w-full sm:w-auto">
        <p className="sm:border-r border-gray-500  w-full mb-0 px-2 sm:w-auto min-w-[180px]">
          カテゴリ名
        </p>
        <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto min-w-[160px]">
          スラッグ
        </p>
        <p className=" flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto  min-w-[250px] max-w-[650px]">
          説明文
        </p>
      </div>
      <div className="mb-10">
        {sortedCategories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between flex-col sm:flex-row border-b border-gray-500 w-full"
            >
              <div className="flex flex-col  sm:flex-row py-4 items-center w-full sm:w-auto">
                <p className="sm:border-r border-gray-500  w-full mb-0 px-2 sm:w-auto min-w-[180px]">
                  {category.name.length > 9
                    ? `${category.name.slice(0, 9)}...`
                    : category.name}
                </p>
                <p className="sm:border-r flex-wrap  w-full border-gray-500 mb-0 px-2 sm:w-auto min-w-[160px]">
                  {category.slug.length > 14
                    ? `${category.slug.slice(0, 14)}...`
                    : category.slug}
                </p>
                <p className="mb-0 px-2 w-full sm:w-auto min-w-[250px] max-w-[560px]">
                  {category.description && category.description.length > 33
                    ? `${category.description.slice(0, 33)}...`
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

import Link from "next/link";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import Button from "@/app/components/ui/Button";
import HeadingTwo from "../../ui/dashboard/HeadingTwo";
import TitleList from "../../layout/dashboard/TitleList";
import ListItem from "../../layout/dashboard/ListItem";

const ListCategory = async () => {
  const categories = await getCategories();

  const sortedCategories = categories.sort((a, b) => a.id - b.id);

  return (
    <>
      <HeadingTwo>カテゴリの一覧</HeadingTwo>
      <TitleList titles={["カテゴリ名", "スラッグ", "説明文"]} />
      <div className="mb-10">
        {sortedCategories.map((category) => {
          return (
            <div
              key={category.id}
              className="flex justify-between flex-col sm:flex-row border-b border-blog-borderBlack w-full"
            >
              <ListItem
                items={[
                  { name: category.name, limit: 9 },
                  { name: category.slug, limit: 14 },
                  { name: category.description, limit: 33 },
                ]}
              />
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

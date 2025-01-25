import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import HeadingTwo from "../../ui/dashboard/HeadingTwo";
import TitleList from "../../layout/dashboard/list/TitleList";
import ListItem from "../../layout/dashboard/list/ListItem";

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
            <ListItem
              key={category.id}
              items={[
                { name: category.name, limit: 9 },
                { name: category.slug, limit: 14 },
                { name: category.description, limit: 33 },
              ]}
              editHref={`/dashboard/category/${category.id}`}
              pageHref={`/${category.slug}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default ListCategory;

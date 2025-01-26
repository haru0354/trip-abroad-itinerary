import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import Section from "@/app/components/layout/Section";
import TopPageListItem from "../layout/blog/TopPageListItem";

const CategoryList = async () => {
  const categories = await getCategories("postsAndPostImage");

  return (
    <Section bgColor="bg-white" name="カテゴリ">
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
        {categories.map((category) => {
          if (
            !category ||
            ((!category.title || category.title === "") &&
              category.posts.every((post) => !post.draft))
          ) {
            return null;
          }
          return (
            <TopPageListItem
              key={category.id}
              href={`/${category.slug}`}
              imageUrl={category.postImage?.url}
              altText={category.postImage?.altText}
              title={category.name}
            />
          );
        })}
      </div>
    </Section>
  );
};

export default CategoryList;

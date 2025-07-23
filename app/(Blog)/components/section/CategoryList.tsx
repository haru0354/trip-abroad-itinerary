import Section from "@/app/components/layout/Section";
import TopPageListItem from "./TopPageListItem";

import type { Prisma } from "@prisma/client";

type CategoryListProps = {
  categories: CategoryWithPostsAndImage[];
};

type CategoryWithPostsAndImage = Prisma.CategoryGetPayload<{
  include: {
    posts: true;
    postImage: true;
  };
}>;
const CategoryList: React.FC<CategoryListProps> = async ({ categories }) => {
  return (
    <Section bgColor="bg-white" name="カテゴリ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-8 gap-4">
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

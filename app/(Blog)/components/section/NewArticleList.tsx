import Section from "@/app/components/layout/Section";
import TopPageListItem from "./TopPageListItem";

import type { Prisma } from "@prisma/client";

type NewArticleListProps = {
  posts: PostWithCategoryAndImage[];
}

type PostWithCategoryAndImage = Prisma.PostGetPayload<{
  include: {
    category: true;
    postImage: true;
  };
}>;

const NewArticleList:React.FC<NewArticleListProps> = ({posts}) => {
  return (
    <Section bgColor="bg-sky-50" name="新着記事">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full my-8 gap-4">
        {posts.map((post) => {
          return (
            post.draft && (
              <TopPageListItem
                key={post.id}
                href={`/${post.category.slug}/${post.slug}`}
                imageUrl={post.postImage?.url}
                altText={post.postImage?.altText}
                title={post.title}
              />
            )
          );
        })}
      </div>
    </Section>
  );
};

export default NewArticleList;

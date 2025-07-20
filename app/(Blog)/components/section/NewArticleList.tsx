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
      <div className="flex w-full my-8 flex-wrap items-center justify-center">
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

import { getPosts } from "@/app/(blog)/lib/service/blogServiceMany";
import Section from "@/app/components/layout/Section";
import TopPageListItem from "./TopPageListItem";

const NewArticleList = async () => {
  const posts = await getPosts("categoryAndPostImage", 6);

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

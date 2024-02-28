import NotFound from "@/app/NotFound";
import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: { post_slug: string };
}): Promise<Metadata> => {
  const postSlug = params.post_slug;

  const posts = await prisma.post.findMany({
    where: {
      slug: postSlug,
    },
  });

  // タイトルとディスクリプションを新しいオブジェクトへ変換
  const processedPosts = posts.map((post) => {
    const postTitle = post.title;
    const postDescription = post.description;
    return {
      postTitle,
      postDescription,
    };
  });

  // タイトルとディスクリプションを特定
  const retrievedPostTitle =
    processedPosts.length > 0 ? processedPosts[0].postTitle : "";
  const retrievedDescription =
    processedPosts.length > 0 ? processedPosts[0].postDescription : "";

  return {
    title: retrievedPostTitle,
    description: retrievedDescription,
  };
};

const Page = async ({ params }: { params: { post_slug: string } }) => {
  const postSlug = params.post_slug;

  const posts = await prisma.post.findMany({
    where: {
      slug: postSlug,
    },
  });

  return (
    <>
      {posts.length === 0 ? (
        <>
          <NotFound />
          <p>記事がありません。</p>
        </>
      ) : (
        posts.map((post) => {
          return (
            <>
              <div key={post.id}>
                <ArticleTop title={post.title} src={"/008.jpg"} alt={"a"} />
                <p> {post.content}</p>
              </div>
            </>
          );
        })
      )}
    </>
  );
};

export default Page;

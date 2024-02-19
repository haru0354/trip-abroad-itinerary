import NotFound from "@/app/NotFound";
import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";

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
              <ArticleTop title={post?.title} src={"/008.jpg"} alt={"a"} />
              <p> {post?.content}</p>
            </>
          );
        })
      )}
    </>
  );
};

export default Page;

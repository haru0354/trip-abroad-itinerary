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
      <div className="p-8 mx-4 bg-white rounded">
        {posts.map((post) => {
          return (
            <>
              <ArticleTop title={post?.title} src={"/008.jpg"} alt={"a"} />
              <p> {post?.content}</p>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;

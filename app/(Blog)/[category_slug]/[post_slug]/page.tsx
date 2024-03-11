import NotFound from "@/app/NotFound";
import ArticleContentArea from "@/app/components/blog/ArticleContentArea";
import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";

const Page = async ({ params }: { params: { post_slug: string } }) => {
  const postSlug = params.post_slug;

  const posts = await prisma.post.findMany({
    where: {
      slug: postSlug,
    },
    include: {
      postImage: true,
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
          const formattedCreatedDate = new Date(
            post.createdDate
          ).toLocaleDateString();
          return (
            <div key={post.id}>
              <ArticleTop
                title={post.title}
                src={post.postImage?.url}
                alt={post.postImage?.altText}
              />
              <p className="text-gray-500 mb-5">
                記事の投稿日：{formattedCreatedDate}
              </p>
              <ArticleContentArea content={post.content}/>
            </div>
          );
        })
      )}
    </>
  );
};

export default Page;

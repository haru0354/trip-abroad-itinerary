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
          if (post.draft) {
            // draftがfalseの場合のみ記事を表示する
            return (
              <div key={post.id}>
                <h1>{post.title}</h1>
                <ArticleTop
                  src={post.postImage?.url}
                  alt={post.postImage?.altText}
                />
                <p className="text-gray-500 mb-5">
                  記事の投稿日：{formattedCreatedDate}
                </p>
                <ArticleContentArea content={post.content} />
              </div>
            );
          }
          return (
            <>
              <NotFound />
              <p>記事がありません。</p>
            </>
          ); 
        })
      )}
    </>
  );
};

export default Page;

import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";

const Page = async ({ params }: { params: { article: string } }) => {
  const id = Number(params.article);

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  
  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <ArticleTop
          title={post?.title}
          src={"/008.jpg"}
          alt={"a"}
        />
        {post?.content}
      </div>
    </>
  );
};

export default Page;

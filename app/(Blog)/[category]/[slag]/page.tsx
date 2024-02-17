import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";

const Page = async ({ params }: { params: { slag: string } }) => {
  const slag = params.slag;

  const post = await prisma.post.findUnique({
    where: {
      slag,
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

import ArticleTop from "@/app/components/blog/ArticleTop";
import prisma from "@/app/components/lib/prisma";

const page = async ({ params }: { params: { article: string } }) => {
  const slug = params.article;

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <ArticleTop
          title={"海外旅行に必要な英語力はどれぐらい？どの程度話せれば良いのか"}
          src={"/008.jpg"}
          alt={"a"}
        />
        <p>個別記事</p>
        
      </div>
    </>
  );
};

export default page;

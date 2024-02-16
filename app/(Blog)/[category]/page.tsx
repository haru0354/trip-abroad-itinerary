import ArticleTop from "@/app/components/blog/ArticleTop";
import Card from "@/app/components/blog/Card";
import prisma from "@/app/components/lib/prisma";
import Link from "next/link";

const page = async ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const posts = await prisma.post.findMany();

  if (!category) {
    return <p>削除対象のメモがありません。</p>;
  }

  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <ArticleTop
          title={"海外旅行に必要な英語力はどれぐらい？どの程度話せれば良いのか"}
          src={"/008.jpg"}
          alt={"a"}
        />
        <h2 className="p-2 text-3xl">{category}の記事一覧</h2>
        {posts
          .filter((post) => post.category === category)
          .map((post) => {
            return <Card key={post.id} post={post} />;
          })}
      </div>
    </>
  );
};

export default page;

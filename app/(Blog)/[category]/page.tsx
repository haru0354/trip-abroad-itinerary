import ArticleTop from "@/app/components/blog/ArticleTop";
import Card from "@/app/components/blog/Card";
import prisma from "@/app/components/lib/prisma";
import Link from "next/link";

const page = async ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const posts = await prisma.post.findMany();

  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <h2 className="p-2 text-3xl">{category}の記事一覧</h2>
        {posts
          .filter((post) => post.categorySlag === category)
          .map((post) => {
            return <Link href={`/${post.categorySlag}/${post.id}`}>
            <Card key={post.id} post={post} /></Link>;
          })}
      </div>
    </>
  );
};

export default page;

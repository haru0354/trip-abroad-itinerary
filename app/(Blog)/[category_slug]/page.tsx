import ArticleTop from "@/app/components/blog/ArticleTop";
import Card from "@/app/components/blog/Card";
import prisma from "@/app/components/lib/prisma";
import Link from "next/link";

const page = async ({ params }: { params: { category_slug: string } }) => {
  const categorySlug = params.category_slug;

  const posts = await prisma.post.findMany({
    where: {
      category: {
        slug: categorySlug
      }
    },
    include: {
      category: true,
    },
  });


  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <h2 className="p-2 text-3xl">{categorySlug}の記事一覧</h2>
        {posts
          .filter((post) => post.category.slug === categorySlug)
          .map((post) => {
            return <Link href={`/${post.category.slug}/${post.slug}`}>
            <Card key={post.id} post={post} /></Link>;
          })}
      </div>
    </>
  );
};

export default page;

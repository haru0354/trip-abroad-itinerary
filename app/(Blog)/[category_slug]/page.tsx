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

  // カテゴリ名を取り出して新しいオブジェクトに変換
  const processedPosts = posts.map((post) => {
    const categoryName = post.category.name;
    const categoryContent = post.category.content;
    return {
      categoryName,
      categoryContent,
    };
  });

  // カテゴリ名の取得。カテゴリ名がない場合はエラーメッセージを設定する
  const retrievedCategoryName = processedPosts.length > 0 ? processedPosts[0].categoryName + "の記事一覧" : "カテゴリがありません";
  const retrievedCategoryContent = processedPosts.length > 0 ? processedPosts[0].categoryContent : "";

  return (
    <>
      <div className="p-8 mx-4 bg-white rounded">
        <h2 className="p-2 text-3xl">{retrievedCategoryName}</h2>
        <p>{retrievedCategoryContent}</p>
        {posts
          .map((post) => {
            return <Link href={`/${post.category.slug}/${post.slug}`}>
            <Card key={post.id} post={post} /></Link>;
          })}
      </div>
    </>
  );
};

export default page;

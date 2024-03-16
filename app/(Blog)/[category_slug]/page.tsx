import NotFound from "@/app/NotFound";
import Card from "@/app/components/blog/Card";
import prisma from "@/app/components/lib/prisma";
import Link from "next/link";
import ArticleTop from "@/app/components/blog/ArticleTop";

const page = async ({ params }: { params: { category_slug: string } }) => {
  const categorySlug = params.category_slug;

  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
    include: {
      posts: true,
      postImage: true,
    },
  });

  if (!category || (!category.title && category.posts.length > 0 && category.posts.every(post => !post.draft))) {
    return (
      <>
        <NotFound />
        <p>カテゴリが存在しないか削除された可能性があります。</p>
      </>
    );
  }

  return (
    <>
      {category?.title ? (
        <h1>{category?.title}</h1>
      ) : (
        <h1>「{category?.name} 」のカテゴリ</h1>
      )}
      {category.postImage?.url && (
        <ArticleTop
          src={category.postImage?.url}
          alt={category.postImage?.altText}
        />
      )}
      {category.content && <p>{category.content}</p>}
      <h2 className="p-2 mt-10 text-3xl">{category?.name}の記事一覧</h2>
      {category.posts.map((post) => {
        return (
          <Link href={`/${category.slug}/${post.slug}`} key={post.id}>
            <Card post={post} />
          </Link>
        );
      })}
    </>
  );
};

export default page;

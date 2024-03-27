import Link from "next/link";

import NotFound from "@/app/NotFound";
import Card from "@/app/components/blog/Card";
import ArticleTop from "@/app/components/blog/blogContent/ArticleTop";
import Breadcrumbs from "@/app/components/blog/Breadcrumbs";

import { getCategory } from "@/app/components/lib/BlogServiceUnique";

const page = async ({ params }: { params: { category_slug: string } }) => {
  const category = await getCategory("slug",params.category_slug, "postsAndPostImage");

  if (
    !category ||
    (!category.title && category.posts.every((post) => !post.draft))
  ) {
    return (
      <>
        <NotFound />
        <p>カテゴリが存在しないか削除された可能性があります。</p>
      </>
    );
  }

  return (
    <>
      <Breadcrumbs
        categoryName={category?.name}
        categorySlug={category.slug}
        isCategoryDirectory={true}
      />
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

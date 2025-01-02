import Link from "next/link";
import { getCategory } from "../../lib/service/blogServiceUnique";
import { getCategories } from "@/app/(blog)/lib/service/blogServiceMany";
import NotFound from "@/app/not-found";
import Card from "@/app/components/blog/Card";
import ArticleTop from "@/app/components/blog/blogContent/ArticleTop";
import Breadcrumbs from "@/app/components/blog/Breadcrumbs";
import SideMenu from "../../components/side-menu/SideMenu";
import ArticleContentArea from "../../components/content-area/parts/ArticleContentArea";

export async function generateStaticParams() {
  const categories = await getCategories("categoryAndPostImage");

  return categories.map((category) => ({
    params: {
      category_slug: category.slug,
    },
    revalidate: 60 * 60 * 24 * 15, 
  }));
}

const page = async ({ params }: { params: { category_slug: string } }) => {
  const category = await getCategory(
    "slug",
    params.category_slug,
    "postsAndPostImage"
  );

  if (
    !category ||
    (!category.title && category.posts.every((post) => !post.draft))
  ) {
    return (
      <div>
        <NotFound />
        <p>カテゴリが存在しないか削除された可能性があります。</p>
      </div>
    );
  }

  return (
    <>
      <div className="blog w-full md:w-3/4 bg-white rounded-sm py-8 px-4 md:px-12 mr-8 ">
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
        {category.content && <ArticleContentArea content={category.content} />}
        <h2 className="p-2 mt-10 text-3xl">{category?.name}の記事一覧</h2>
        {category.posts.map((post) => {
          return (
            <Link href={`/${category.slug}/${post.slug}`} key={post.id}>
              <Card post={post} />
            </Link>
          );
        })}
      </div>
      <div className="w-full md:w-1/4 py-4 bg-white rounded">
        <SideMenu />
      </div>
    </>
  );
};

export default page;

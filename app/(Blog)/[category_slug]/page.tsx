import { Metadata } from "next";
import NotFound from "@/app/NotFound";
import Card from "@/app/components/blog/Card";
import prisma from "@/app/components/lib/prisma";
import Link from "next/link";
import ArticleTop from "@/app/components/blog/ArticleTop";

export const generateMetadata = async ({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> => {
  const categorySlug = params.category_slug;

  const posts = await prisma.post.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: true,
    },
  });

  // カテゴリ名を取り出して新しいオブジェクトに変換
  const processedCategory = posts.map((post) => {
    const categoryName = post.category.name;
    const categoryDescription = post.category.description;
    return {
      categoryName,
      categoryDescription,
    };
  });

  // カテゴリ名の取得。カテゴリ名がない場合はエラーメッセージを設定する
  const retrievedCategoryTitle =
    processedCategory.length > 0 ? processedCategory[0].categoryName : "";
  const retrievedCategoryDescription =
    processedCategory.length > 0
      ? processedCategory[0].categoryDescription
      : "";

  return {
    title: retrievedCategoryTitle,
    description: retrievedCategoryDescription,
  };
};

const page = async ({ params }: { params: { category_slug: string } }) => {
  const categorySlug = params.category_slug;

  const posts = await prisma.post.findMany({
    where: {
      category: {
        slug: categorySlug,
      },
    },
    include: {
      category: {
        include: {
          postImage: true,
        },
      },
    },
  });

  // カテゴリ名を取り出して新しいオブジェクトに変換
  const processedCategory = posts.map((post) => {
    const categoryName = post.category.name;
    const categoryContent = post.category.content;
    const categoryPostImageTitle = post.category.title;
    const categoryPostImageUrl = post.category?.postImage?.url;
    const categoryPostImageAltText = post.category?.postImage?.altText;
    return {
      categoryName,
      categoryContent,
      categoryPostImageTitle,
      categoryPostImageUrl,
      categoryPostImageAltText,
    };
  });

  // カテゴリ名の取得。カテゴリ名がない場合はエラーメッセージを設定する
  const retrievedCategoryName =
    processedCategory.length > 0 ? (
      processedCategory[0].categoryName + "の記事一覧"
    ) : (
      <>
        <NotFound />
        <p>カテゴリがありません</p>
      </>
    );

  const retrievedCategoryContent =
    processedCategory.length > 0 ? processedCategory[0].categoryContent : "";

  return (
    <>
      {processedCategory.length > 0 &&
        processedCategory[0].categoryPostImageUrl && (
          <ArticleTop
            title={processedCategory[0].categoryPostImageTitle}
            src={processedCategory[0].categoryPostImageUrl}
            alt={processedCategory[0].categoryPostImageAltText}
          />
        )}
      <p>{retrievedCategoryContent}</p>
      <h2 className="p-2 mt-10 text-3xl">{retrievedCategoryName}</h2>
      {posts.map((post) => {
        return (
          <>
            <Link href={`/${post.category.slug}/${post.slug}`} key={post.id}>
              <Card key={post.id} post={post} />
            </Link>
          </>
        );
      })}
    </>
  );
};

export default page;

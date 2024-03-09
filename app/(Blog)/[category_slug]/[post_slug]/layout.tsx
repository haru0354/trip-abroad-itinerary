import prisma from "@/app/components/lib/prisma";
import { Metadata } from "next";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
  <>
  {children}
  </>
  
  ) ;
}

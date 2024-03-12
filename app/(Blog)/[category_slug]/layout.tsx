import SideMenu from "../../components/blog/SideMenu";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
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
      <Header />
      <div className="bg-blue-50 py-8">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
          <div className="blog w-full md:w-3/4 bg-white rounded-sm py-8 px-12 mr-8 ">
            {children}
          </div>
          <div className="w-full md:w-1/4 py-4 bg-white rounded">
            <SideMenu />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

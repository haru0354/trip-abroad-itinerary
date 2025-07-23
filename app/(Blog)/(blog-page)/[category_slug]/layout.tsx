import { Metadata } from "next";

import { blogBrandTitle, blogDescription } from "../../config/blogConfig";
import { getCategory } from "../../lib/service/blogServiceUnique";
import Header from "../../components/layout/blog/Header";
import Footer from "../../components/layout/blog/Footer";

export const generateMetadata = async ({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> => {
  const category = await getCategory("slug", params.category_slug, "posts");

  if (category?.title) {
    return {
      title: category?.title,
      description: category?.description,
    };
  } else if (
    !category ||
    (category.posts.length > 0 && category.posts.every((post) => !post.draft))
  ) {
    return {
      title: `カテゴリが存在しません | ${blogBrandTitle}`,
      description: `${blogDescription}`,
      robots: {
        index: false,
      },
    };
  } else {
    return {
      title: category?.name,
      description: category?.description,
    };
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 bg-blog-bgColor md:pt-4">
        <div className="w-full max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

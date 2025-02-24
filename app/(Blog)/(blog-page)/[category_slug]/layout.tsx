import { Metadata } from "next";

import { blogBrandTitle, siteDescription } from "../../config/blogConfig";
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
      description: `${siteDescription}`,
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
      <div className="bg-blog-bgColor py-8">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

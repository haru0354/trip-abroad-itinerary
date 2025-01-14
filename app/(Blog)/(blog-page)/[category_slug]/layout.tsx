import { Metadata } from "next";
import { getCategory } from "../../lib/service/blogServiceUnique";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const generateMetadata = async ({
  params,
}: {
  params: { category_slug: string };
}): Promise<Metadata> => {
  const brandTItle = process.env.NEXT_PUBLIC_WEBSITE_BRAND_TITLE;
  const siteDescription = process.env.NEXT_PUBLIC_WEBSITE_DESCRIPTION;

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
      title: `カテゴリが存在しません | ${brandTItle}`,
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
      <div className="bg-blue-50 py-8">
        <div className="max-w-[1150px] mx-auto flex flex-col md:flex-row mb-8">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}

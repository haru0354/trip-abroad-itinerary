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

  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (category?.title) {
    return {
      title: `${category?.title} | トラベルメモリー`,
      description: category?.description,
    };
  } else {
    return {
      title: `${category?.name} | トラベルメモリー`,
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

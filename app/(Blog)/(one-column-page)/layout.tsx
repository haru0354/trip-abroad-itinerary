import type { Metadata } from "next";

import { blogBrandTitle, blogTitle } from "../config/blogConfig";
import Header from "../components/layout/blog/Header";
import Footer from "../components/layout/blog/Footer";
import MainContainer from "@/app/components/layout/MainContainer";

export const metadata: Metadata = {
  title: {
    default: `${blogTitle}`,
    template: `%s | ${blogBrandTitle}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 bg-blog-bgColor">
        <MainContainer>
          <div className="w-full px-1 md:px-4">{children}</div>
        </MainContainer>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";

import { blogBrandTitle, blogTitle } from "../config/blogConfig";
import Header from "../components/layout/blog/Header";
import Footer from "../components/layout/blog/Footer";

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
      <main className="flex-1 bg-blog-bgColor">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-4">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

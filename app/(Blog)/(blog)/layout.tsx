import type { Metadata } from "next";

import { blogBrandTitle, blogDescription, blogTitle } from "../config/blogConfig";
import Header from "../components/layout/blog/Header";
import Footer from "../components/layout/blog/Footer";
import BackToTopButton from "@/app/components/ui/button/BackToTopButton";

export const metadata: Metadata = {
  title: {
    default: `${blogTitle}`,
    template: `%s | ${blogBrandTitle}`,
  },
  description: `${blogDescription}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 md:pt-4">
          {children}
      </main>
      <BackToTopButton />
      <Footer />
    </>
  );
}

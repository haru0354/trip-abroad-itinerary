import { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "サイトマップ | 旅のメモリーブック",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="bg-sky-50">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

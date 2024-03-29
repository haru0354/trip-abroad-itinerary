import { Metadata } from "next";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "プライバシーポリシー・免責事項 | 旅のメモリーブック",
  robots: {
    index: false,
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
      <main>
        <div className="main-contents-area">
          <div className="w-full px-1 md:px-8">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

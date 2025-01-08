import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: {
    default: "英語なしで最高の海外旅行の思い出を作る「トラベルメモリー」",
    template: "%s | トラベルメモリー",
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
      <main className="bg-sky-50">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-4">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}

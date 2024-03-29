import { Metadata } from "next";

import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

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
      <HeaderItinerary />
      <main>
        <div className="main-contents-area">
          <div className="w-full px-1 md:px-8">{children}</div>
        </div>
      </main>
      <FooterItinerary isTopAppDirectory={true} />
    </>
  );
}

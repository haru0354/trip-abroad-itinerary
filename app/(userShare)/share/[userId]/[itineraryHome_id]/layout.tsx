import { Metadata } from "next";

import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

export const metadata: Metadata = {
  title: "共有された旅行記 | 旅のメモリーブック",
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
      <main className="bg-sky-50">
        <div className="main-contents-area rounded">
          <div className="w-full px-1 md:px-4">{children}</div>
        </div>
      </main>
      <FooterItinerary isTopAppDirectory={true} />
    </>
  );
}

import { Metadata } from "next";
import getCurrentUser from "@/app/action/getCurrentUser";
import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

export const metadata: Metadata = {
  title: "共有された旅行記 | 旅のメモリーブック",
  robots: {
    index: false, // noindexの設定
  },
  };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <>
        <HeaderItinerary currentUser={currentUser} />
        <main>
          <div className="main-contents-area">
            <div className="contents-area">{children}</div>
          </div>
        </main>
        <FooterItinerary />
    </>
  );
}

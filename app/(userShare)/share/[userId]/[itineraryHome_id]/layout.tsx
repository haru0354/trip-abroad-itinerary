import { Metadata } from "next";
import getCurrentUser from "@/app/action/getCurrentUser";
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
  const currentUser = await getCurrentUser();

  return (
    <>
      <HeaderItinerary currentUser={currentUser} />
      <main>
        <div className="main-contents-area">
        <div className="w-full px-1 md:px-8">{children}</div>
        </div>
      </main>
      <FooterItinerary isTopAppDirectory={true} />
    </>
  );
}

import { Metadata } from "next";
import getCurrentUser from "@/app/action/getCurrentUser";
import FooterMenu from "@/app/components/FooterMenu";
import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

export const metadata: Metadata = {
  title: {
    default: "旅行の編集",
    template: "%s | 旅のメモリーブック",
  },
  robots: {
    index: false,
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { itineraryHome_id: string };
}>) {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  const itineraryHomeId = Number(params.itineraryHome_id);

  return (
    <>
      <HeaderItinerary currentUser={currentUser} />
      <main className="bg-blue-50">
        <div className="main-contents-area">
          <div className="px-1 md:px-8 w-full">{children}</div>
        </div>
      </main>
      <FooterItinerary />
      <FooterMenu itineraryHomeId={itineraryHomeId} userId={userId} />
    </>
  );
}

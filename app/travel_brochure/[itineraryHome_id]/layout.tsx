import { Metadata } from "next";
import ItineraryAuthGuard from "@/app/components/auth/authGuard/ItineraryAuthGuard";
import getCurrentUser from "@/app/action/getCurrentUser";
import FooterMenu from "@/app/components/FooterMenu";
import HeaderItinerary from "@/app/components/HeaderItinerary";
import FooterItinerary from "@/app/components/FooterItinerary";

export const metadata: Metadata = {
  title: {
    default: "旅行の編集",
    template: "%s | 旅のメモリーブック",
  },};

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
        <main>
          <div className="main-contents-area">
            <div className="contents-area">{children}</div>
          </div>
        </main>
        <FooterItinerary />
        <FooterMenu itineraryHomeId={itineraryHomeId} userId={userId} />
    </>
  );
}

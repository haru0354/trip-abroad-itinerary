import { Metadata } from "next";
import { getCurrentUserId } from "@/app/(memorybook)/memorybook/lib/getCurrentUser";
import FooterMenu from "../../components/FooterMenu";
import HeaderItinerary from "../../components/HeaderItinerary";
import Footer from "../../components/layout/Footer";

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
  const currentUserId = (await getCurrentUserId()) ?? undefined;
  const itineraryHomeId = Number(params.itineraryHome_id);

  return (
    <>
      <HeaderItinerary />
      <main className="bg-blue-50">
        <div className="main-contents-area">
          <div className="px-1 md:px-8 w-full">{children}</div>
        </div>
      </main>
      <Footer />
      <FooterMenu itineraryHomeId={itineraryHomeId} userId={currentUserId} />
    </>
  );
}

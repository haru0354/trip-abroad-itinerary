import { Metadata } from "next";

import FooterMenu from "../../components/layout/footer/FooterMenu";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/footer/Footer";

const brandTItle = process.env.NEXT_PUBLIC_ITINERARY_BRAND_TITLE;

export const metadata: Metadata = {
  title: {
    default: "旅行の編集",
    template: `%s | ${brandTItle}`,
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
  params: { trip_id: string };
}>) {
  const tripId = Number(params.trip_id);

  return (
    <>
      <Header />
      <main className="bg-itinerary-bgColor">
        <div className="main-contents-area">
          <div className="px-1 md:px-8 w-full">{children}</div>
        </div>
      </main>
      <Footer />
      <FooterMenu tripId={tripId} />
    </>
  );
}
